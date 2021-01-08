const User = require('~/knex/models/User');
const PokemonCommands = require('~/lib/PokemonCommands');
import Transfers from '~/knex/models/Transfers';
import '~/lib/Database';
import Errors from '~/lib/Errors';
import Utils from '~/lib/Utils';

export default async function handler(req, res) {
    let pokemonId, userId, choice, pokemon;
    try {
        if(req.headers.client == 'discord') { //pokemon ID is in transfers table
            Utils.doParametersExist(['userId', 'choice'], req.body);
            userId = req.body.userId;
            pokemonId = (await Transfers.query().select('pokemonId')
                .where('userId', userId).first()).pokemonId;
            choice = Utils.findElement(['yes', 'y', 'confirm'], req.body.choice, null, 'INVALID_TRANSFER_CHOICE');
        }
        else { //website request, bypass transfers table
            Utils.doParametersExist(['userId', 'pokemonId'], req.body);
            userId = req.body.userId;
            pokemonId = Utils.isNumeric(req.body.pokemonId);
        }
        console.log(pokemonId)
        userId = req.body.userId;
        pokemon = await PokemonCommands.getStrictPokemon(userId, pokemonId);
    }
    catch(err) {
        res.json({error: Errors.getError(err, req.headers.errors)});
        return res.end();
    }
    finally {
        await Transfers.query().delete()
            .where('userId', userId);

        await User.query().update({
            nextCommand: null,
        })
        .where('userId', userId);
    }

    pokemon = await PokemonCommands.transferPokemon(userId, pokemon.pokemonId);
    res.json(pokemon);
    res.end();
}