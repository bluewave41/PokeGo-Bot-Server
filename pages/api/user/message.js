const User = require('~/knex/models/User');
import Utils from '~/lib/Utils';
import '~/lib/Database';
import Errors from '~/lib/Errors';

export default async function handler(req, res) {
    let userId;

    try {
        Utils.doParametersExist(['userId'], req.body, 'MISSING_PARAMETER');
        userId = req.body.userId;
    }
    catch(err) {
        res.json({error: Errors.getError(err.message, req.headers.errors, err.replace)});
        return res.end();
    }

    await User.query().update({
        lastMessageId: req.body.messageId
    })
    .where('userId', userId);

    res.end();
}