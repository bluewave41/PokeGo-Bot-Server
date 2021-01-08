const Inventory = require('~/knex/models/Inventory');
import '~/lib/Database';
import Errors from '~/lib/Errors';
import InventoryCommands from '~/lib/InventoryCommands';
import Utils from '~/lib/Utils';

export default async function handler(req, res) {
    let userId;
    
    try {
        Utils.doParametersExist(['userId'], req.body);
        userId = req.body.userId;
    }
    catch(err) {
        res.json({error: Errors.getError(err, req.headers.errors)});
        return res.end();
    }

    const inventory = await InventoryCommands.getInventory(userId);

    res.json(inventory);
    res.end();
}