const User = require('~/knex/models/User');
const PokemonCommands = require('~/lib/PokemonCommands');
import '~/lib/Database';
import Errors from '~/lib/Errors';
import Utils from '~/lib/Utils';

export default async function handler(req, res) {
    let userId, choice, pokemon;
    try {
        Utils.doParametersExist(['userId', 'choice', 'pokemonId'], req.body, 'MISSING_PARAMETER');
        userId = req.body.userId;
        choice = Utils.findElement(['yes', 'y'], req.body.choice, null, 'INVALID_TRANSFER_CHOICE');
        pokemon = await PokemonCommands.getStrictPokemon(userId, req.body.pokemonId);
    }
    catch(err) {

        res.json({error: Errors.getError(err.message, req.headers.errors, err.replace)});
        return res
        .end();
    }
    finally {
        await User.query().update({
            nextCommand: null,
            saved: null,
        })
        .where('userId', userId);
    }

    pokemon = await PokemonCommands.transferPokemon(userId, pokemon.pokemonId);
    res.json(pokemon);
    res.end();
}