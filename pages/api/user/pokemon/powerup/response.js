const PowerupTable = require('~/lib/PowerupTable');
import Utils from '~/lib/Utils';
import '~/lib/Database';
import Errors from '~/lib/Errors';
import CustomError from '~/lib/errors/CustomError';
import UserCommands from '~/lib/UserCommands';
import PokemonCommands from '~/lib/PokemonCommands';
import CandyCommands from '~/lib/CandyCommands';
import Powerups from '~/knex/models/Powerups';
import PokemonModel from '~/knex/models/Pokemon';

export default async function handler(req, res) {
    let userId, response;
    try {
        Utils.doParametersExist(['userId', 'response'], req.body, 'MISSING_PARAMETER');
        userId = req.body.userId;
        response = req.body.response;
    }
    catch(err) {
        console.log(err);
        res.json({error: Errors.getError(err.message, req.headers.errors, err.replace)});
        return res.end();
    }

    const powerup = await Powerups.query().select('*')
        .where('userId', userId).first();

    const pokemon = await PokemonCommands.getStrictPokemon(userId, powerup.pokemonId);
    const candy = await CandyCommands.getCandyForPokemon(userId, pokemon.candyId);

    let err;

    if(Utils.isNumeric(response)) { //user chose a new level
        if(response > powerup.maximum_times) { //user chose a level higher than they can do
            //TODO: implement player level limit
            err = new CustomError('LEVEL_TOO_HIGH', powerup.maximum_times);
            res.json({ error: Errors.getError(err.message, req.headers.errors, err.replace )});
            return res.end();
        }
        const currentPowerupRow = PowerupTable.findIndex(el => el.level == pokemon.level);
        const newLevel = currentPowerupRow + parseInt(response);
        const nextPowerupRow = PowerupTable[newLevel];

        const group = PowerupTable.slice(currentPowerupRow, newLevel); //take the next 
        const powerupCost = group.reduce((acc, cur) => acc+cur.candy, 0);

        //update saved table
        await Powerups.query().update({
            times: response,
            required_candy: powerupCost,
        })
        .where('userId', userId);

        res.json({ pokemon: pokemon, candy: candy, requiredCandy: powerupCost, nextLevel: nextPowerupRow.level,
            newCP: pokemon.calculateNewCP(nextPowerupRow.level), howManyLevels: powerup.maximum_times });
        return res.end();
    }
    else if(response == 'confirm') {
        //edit pokemon
        let powerupRow = PowerupTable.findIndex(el => el.level == pokemon.level);
        powerupRow += powerup.times;
        console.log(powerupRow);
        powerupRow = PowerupTable[powerupRow];

        const maxHP = pokemon.calculateHP(powerupRow.level); //new maxHP
        //pokemon actual HP is 

        await PokemonModel.query().update({
            cp: pokemon.calculateNewCP(powerupRow.level),
            hp: pokemon.hp + (maxHP - pokemon.maxHP),
            maxHP: maxHP,
            level: powerupRow.level,
        })
        .where('pokemonId', pokemon.pokemonId);

        await UserCommands.reset(userId);

        await Powerups.query().delete()
            .where('userId', userId);

        await CandyCommands.removeCandy(userId, pokemon.candyId, powerup.required_candy);

        
        //implement stardust cost
    }
    else if(response == 'quit') {
        await UserCommands.reset(userId);
        await Powerups.query().delete()
            .where('userId', userId);
        res.send({ quit: true });
        res.end();
    }
    else {
        err = new CustomError('INVALID_RESPONSE');
        res.json({ error: Errors.getError(err.message, req.headers.errors, err.replace )});
    }
}