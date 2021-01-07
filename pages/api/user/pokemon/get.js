const CandyCommands = require('~/lib/CandyCommands');
import '~/lib/Database';
import Utils from '~/lib/Utils';
import PokemonCommands from '~/lib/PokemonCommands';
import Errors from '~/lib/Errors';
import CustomError from '~/lib/errors/CustomError';

export default async function handler(req, res) {
    let userId, pokemonId, pokemon;
    try {
        Utils.doParametersExist(['userId', 'pokemonId'], req.body, 'MISSING_PARAMETER');
        userId = req.body.userId;
        pokemonId = Utils.isNumeric(req.body.pokemonId);
        if(!pokemonId) {
            throw new CustomError('NON_NUMERIC_POKEMON_ID');
        }
        pokemon = await PokemonCommands.getStrictPokemon(userId, pokemonId, 'NO_POKEMON');
    }
    catch(err) {
        res.json({error: Errors.getError(err.message, req.headers.errors, err.replace)});
        return res.end();
    }

    let candy = await CandyCommands.getCandyForPokemon(userId, pokemon.candyId);

    pokemon.candy = candy;

    res.json(pokemon);
    res.end();
}