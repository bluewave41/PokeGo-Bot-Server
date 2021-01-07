const User = require('~/knex/models/User');
import Utils from '~/lib/Utils';
import '~/lib/Database';
import Errors from '~/lib/Errors';
import UserCommands from '~/lib/UserCommands';

export default async function handler(req, res) {
    let userId;

    try {
        Utils.doParametersExist(['userId'], req.body);
        userId = req.body.userId;
    }
    catch(err) {
        res.json({error: Errors.getError(err.message, req.headers.errors, err.replace)});
        return res.end();
    }

    const saved = await UserCommands.getSaved(userId);

    res.json(saved);
    res.end();
}