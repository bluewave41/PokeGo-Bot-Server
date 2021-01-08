const PokemonCommands = require('~/lib/PokemonCommands');
const PokemonBuilder = require('~/lib/PokemonBuilder');
import '~/lib/Database';
import Errors from '~/lib/Errors';
import CustomError from '~/lib/errors/CustomError';
import Utils from '~/lib/Utils';

export default async function handler(req, res) {
    let userId, pokemonId, amount;
    try {
        Utils.doParametersExist(['userId', 'pokemonId', 'amount'], req.body, 'MISSING_PARAMETER');
        userId = req.body.userId;
        pokemonId = Utils.isNumeric(req.body.pokemonId);
        if(!pokemonId) {
            throw new CustomError('NON_NUMERIC_POKEMON_ID');
        }
        amount = Utils.isNumeric(req.body.amount, );
        if(!amount) {
            throw new CustomError('GENERIC_NON_NUMERIC');
        }
    }
    catch(err) {
        res.json({error: Errors.getError(err, req.headers.errors)});
        return res.end();
    }

    let pokemon = PokemonBuilder.generatePokemon(pokemonId, 5, userId);

    for(var i=0;i<amount;i++) {
        await PokemonCommands.catchPokemon(userId, pokemon, 3);
    }

    res.json(pokemon);
    res.end();
}