const Pokemon = require('~/knex/models/Pokemon');
const { raw } = require('objection');
import '~/lib/Database';
import Errors from '~/lib/Errors';
import PokemonCommands from '~/lib/PokemonCommands';
import Utils from '~/lib/Utils';

export default async function handler(req, res) {
    let userId, pokemonId, pokemon;
    try {
        Utils.doParametersExist(['userId', 'pokemonId'], req.body, 'MISSING_PARAMETER');
        userId = req.body.userId;
        pokemonId = Utils.isNumeric(req.body.pokemonId, 'NON_NUMERIC_POKEMON_ID');
        if(!pokemonId) {
            throw new CustomError('NON_NUMERIC_POKEMON_ID');
        }
        pokemon = await PokemonCommands.getStrictPokemon(userId, pokemonId, 'NO_POKEMON');
    }
    catch(err) {
        res.json({error: Errors.getError(err, req.headers.errors)});
        return res.end();
    }

    pokemon = await Pokemon.query().updateAndFetchById(pokemonId, {
        favorite: raw('!favorite')
    })
    .where('ownerId', userId)
    .where('pokemonId', pokemonId);

    res.json(pokemon);
    res.end();
}