const Pokemon = require('~/knex/models/Pokemon');
import '~/lib/Database';
import Errors from '~/lib/Errors';
import CustomError from '~/lib/errors/CustomError';
import PokemonCommands from '~/lib/PokemonCommands';
import Utils from '~/lib/Utils';

export default async function handler(req, res) {
    let userId, pokemonId, nickname, oldPokemon;
    const nicknameRegex = /^[a-zA-Z0-9 ]+$/;
    try {
        Utils.doParametersExist(['userId', 'pokemonId', 'nickname'], req.body, 'MISSING_PARAMETER');
        userId = req.body.userId;
        pokemonId = Utils.isNumeric(req.body.pokemonId);
        if(!pokemonId) {
            throw new CustomError('NON_NUMERIC_POKEMON_ID');
        }
        nickname = Utils.checkLength(req.body.nickname, 1, 20, 'INVALID_NICKNAME_LENGTH');
        if(!nicknameRegex.test(nickname)) {
            throw new CustomError('INVALID_NICKNAME');
        }
        oldPokemon = await PokemonCommands.getStrictPokemon(userId, pokemonId, 'NO_POKEMON');
    }
    catch(err) {
        res.json({error: Errors.getError(err.message, req.headers.errors, err.replace)});
        return res.end();
    }

    let pokemon = await Pokemon.query()
        .updateAndFetchById(pokemonId, { nickname: nickname })
        .where('ownerId', userId)
        .where('pokemonId', pokemonId);

    pokemon.oldName = oldPokemon.name;

    res.json(pokemon);
    res.end();
}