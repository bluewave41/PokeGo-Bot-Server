const User = require('~/knex/models/User');
import Utils from '~/lib/Utils';
import '~/lib/Database';
import Errors from '~/lib/Errors';
import PlayerEncounters from '~/knex/models/PlayerEncounters';
import Caught from '~/knex/models/Caught';

export default async function handler(req, res) {
    let userId;

    try {
        Utils.doParametersExist(['userId'], req.body);
        userId = req.body.userId;
        await Utils.isAdmin(userId);
    }
    catch(err) {
        res.json({error: Errors.getError(err, req.headers.errors)});
        return res.end();
    }

    await PlayerEncounters.query().delete()
        .where('userId', userId);

    await Caught.query().delete()
        .where('userId', userId);

    await User.query().update({
        nextCommand: null,
        saved: null,
        team: null,
        gotStarter: false,
    })
    .where('userId', userId);

    res.end();
}