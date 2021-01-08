const PokemonCommands = require('~/lib/PokemonCommands');
const PowerupTable = require('~/lib/PowerupTable');
const CandyCommands = require('~/lib/CandyCommands');
import Utils from '~/lib/Utils';
import '~/lib/Database';
import Errors from '~/lib/Errors';
import CustomError from '~/lib/errors/CustomError';
import UserCommands from '~/lib/UserCommands';
import Powerups from '~/knex/models/Powerups';

export default async function handler(req, res) {
    let userId, pokemonId, candy, amount, pokemon;
    try {
        Utils.doParametersExist(['userId', 'pokemonId'], req.body, 'MISSING_PARAMETER');
        userId = req.body.userId;
        pokemonId = Utils.isNumeric(req.body.pokemonId);
        if(!pokemonId) {
            throw new CustomError('NON_NUMERIC_POKEMON_ID');s
        }
        pokemon = await PokemonCommands.getStrictPokemon(userId, pokemonId);
        candy = await CandyCommands.getCandyForPokemon(userId, pokemon.candyId);
        //TODO: get user level
        //check stardust
        //TODO: check pokemon level, max is 40
    }
    catch(err) {
        res.json({error: Errors.getError(err, req.headers.errors)});
        return res.end();
    }

    const powerupIndex = PowerupTable.findIndex(el => el.level == pokemon.level);
    const nextLevel = PowerupTable[powerupIndex+1];

    //first check if we can power them up once
    if(nextLevel.candy <= candy) {
        //user is able to powerup at least once
        let candyTotal = 0;
        let howManyLevels = 0;

        //calculate how many times we can power them up
        for(var i=powerupIndex+1;i<PowerupTable.length;i++) {
            candyTotal += PowerupTable[i].candy;
            howManyLevels++;
            if(candyTotal >= candy) {
                break;
            }
        }
        await UserCommands.update(userId, [
            { rowName: 'nextCommand', value: 'powerup/PowerupResponse' }
        ]);
        await Powerups.query().insert({
            userId: userId,
            pokemonId: pokemon.pokemonId,
            maximum_times: howManyLevels,
            required_candy: nextLevel.candy,
        });
        res.json({ pokemon: pokemon, candy: candy, requiredCandy: nextLevel.candy, nextLevel: nextLevel.level,
            newCP: pokemon.calculateNewCP(nextLevel.level), howManyLevels: howManyLevels });
    }
    else {
        const err = new CustomError('INSUFFICIENT_CANDY', PowerupTable[powerupIndex+1].candy);
        res.json({ error: Errors.getError(err, req.headers.errors)});
    }
    res.end();
}