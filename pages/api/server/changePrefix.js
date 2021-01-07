const Server = require('~/knex/models/Server');
import '~/lib/Database';
import Utils from '~/lib/Utils';
import ErrorList from '~/lib/Errors';

export default async function handler(req, res) {
    let userId, prefix, serverId;

    try {
        Utils.doParametersExist(['userId', 'prefix', 'serverId'], req.body);
        userId = req.body.userId;
        prefix = Utils.checkLength(req.body.prefix, 1, 3);
        serverId = req.body.serverId;
    }
    catch(err) {
        if(err instanceof ReferenceError) {
            res.json({error: err.message});
        }
        else if(err instanceof RangeError) {
            res.json({error: ErrorList.getError(req.headers.errors, 'INVALID_PREFIX_LENGTH')});
        }
        return res.end();
    }

    await Server.query().update({
        prefix: prefix,
    })
    .where('serverId', serverId);

	res.end();
}