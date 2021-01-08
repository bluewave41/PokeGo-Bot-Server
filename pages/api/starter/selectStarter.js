const PokemonBuilder = require('~/lib/PokemonBuilder');
const PokemonCommands = require('~/lib/PokemonCommands');
const Starters = require('./Starters');
import InventoryCommands from '~/lib/InventoryCommands';
import '~/lib/Database';
import Utils from '~/lib/Utils';
import Errors from '~/lib/Errors';
import UserCommands from '~/lib/UserCommands';

export default async function handler(req, res) {
    let userId, starter;
    try {
        Utils.doParametersExist(['userId', 'starter'], req.body, 'MISSING_PARAMETER');
        userId = req.body.userId;
        starter = Utils.findElement(Starters, req.body.starter, 2, 'INVALID_STARTER');
    }
    catch(err) {
        res.json({error: Errors.getError(err, req.headers.errors)});
        return res.end();
    }

    let pokemon = PokemonBuilder.generatePokemon(starter[0], 1, userId);

    await PokemonCommands.catchPokemon(userId, pokemon, 3);
    await InventoryCommands.addItems(userId, 1, 5);
    await UserCommands.update(userId, [
        { rowName: 'gotStarter', value: true},
        { rowName: 'nextCommand', value: null}
    ]);

    res.json(pokemon);
    res.end();
}