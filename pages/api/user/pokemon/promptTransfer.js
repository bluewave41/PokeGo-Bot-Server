const User = require('~/knex/models/User');
import '~/lib/Database';
import Errors from '~/lib/Errors';
import PokemonCommands from '~/lib/PokemonCommands';
import Utils from '~/lib/Utils';

export default async function handler(req, res) {
    let userId, pokemonId, pokemon;
    try {
        Utils.doParametersExist(['userId', 'pokemonId'], req.body, 'MISSING_PARAMETER');
        userId = req.body.userId;
        pokemonId = Utils.isNumeric(req.body.pokemonId);
        if(!pokemonId) {
            throw new CustomError('NON_NUMERIC_POKEMON_ID');
        }
        await PokemonCommands.canTransferPokemon(userId, pokemonId, 'CANT_TRANSFER_LAST_POKEMON');
        pokemon = await PokemonCommands.getStrictPokemon(userId, pokemonId, 'NO_POKEMON');
    }
    catch(err) {
        res.json({error: Errors.getError(err.message, req.headers.errors, err.replace)});
        return res.end();
    }

    await User.query().update({
        nextCommand: 'transfer/ConfirmTransfer',
        saved: pokemonId,
    })
    .where('userId', userId);

    res.json(pokemon);
    res.end();
}