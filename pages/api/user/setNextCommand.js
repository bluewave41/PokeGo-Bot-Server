const User = require('~/knex/models/User');
import Utils from '~/lib/Utils';
import '~/lib/Database';
import Errors from '~/lib/Errors';

export default async function handler(req, res) {
    let userId, nextCommand, saved;

    try {
        Utils.doParametersExist(['userId'], req.body);
        userId = req.body.userId;
        nextCommand = req.body.nextCommand;
        saved = req.body.saved;
    }
    catch(err) {
        res.json({error: Errors.getError(err.message, req.headers.errors, err.replace)});
        return res.end();
    }

    await User.query().update({
        nextCommand: nextCommand,
        saved: saved,
    })
    .where('userId', userId);

    res.end();
}