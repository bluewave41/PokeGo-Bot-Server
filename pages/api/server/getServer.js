const Server = require('~/knex/models/Server');
import '~/lib/Database';
import Errors from '~/lib/Errors';
import Utils from '~/lib/Utils';

export default async function handler(req, res) {
    let serverId;
    try {
        Utils.doParametersExist(['serverId'], req.body);
        serverId = req.body.serverId;
    }
    catch(err) {
        res.json({error: Errors.getError(err, req.headers.errors)});
        return res.end();
    }

    let server = await Server.query().select('serverId', 'prefix')
        .where('serverId', serverId).first();

	if(!server) {
		server = await Server.query().insert({
			serverId: serverId,
			prefix: '!',
        });
    }

	res.json(server);
	res.end();
}