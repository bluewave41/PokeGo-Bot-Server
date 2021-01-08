const User = require('~/knex/models/User');
import '~/lib/Database';
import EncounterCommands from '~/lib/EncounterCommands';
import Errors from '~/lib/Errors';
import CustomError from '~/lib/errors/CustomError';
import InventoryCommands from '~/lib/InventoryCommands';
import PokemonCommands from '~/lib/PokemonCommands';
import UserCommands from '~/lib/UserCommands';
import Utils from '~/lib/Utils';

export default async function handler(req, res) {
    let userId;

    try {
        Utils.doParametersExist(['userId'], req.body, 'MISSING_PARAMETER');
        userId = req.body.userId;
        await canAccess(userId);
    }
    catch(err) {
        res.json({error: Errors.getError(err, req.headers.errors)});
        return res.end();
    }

    let user = await User.query().select('location', 'secretId')
        .where('userId', userId).first();

    let secretId = user.secretId;
    let location = user.location;

    const sprites = await EncounterCommands.getSprites(userId, location, secretId);
    
    if(sprites.length) {
        await User.query().update({
            nextCommand: 'encounter/StartEncounter',
        })
        .where('userId', userId);

        res.json({ sprites: sprites });
    }
    else {
        let err = new CustomError('CELL_EMPTY');
        res.json({error: Errors.getError(err, req.headers.errors)});
    }

    res.end();
}

async function canAccess(userId) {
    const pokeBallCount = await InventoryCommands.getPokeballs(userId);
    if(!pokeBallCount.length) {
        throw new CustomError('INSUFFICIENT_POKEBALLS');
    }

    const storageAmount = await UserCommands.getRows(userId, 'storage');
    const pokemonCount = await PokemonCommands.getPokemonCount(userId);
    if(pokemonCount+1 > storageAmount) {
        throw new CustomError('STORAGE_FULL');
    }
    return true;
}