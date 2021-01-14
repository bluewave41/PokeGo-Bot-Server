import Utils from '~/lib/Utils';
import Errors from '~/lib/Errors';
import '~/lib/Database';
import Teams from '~/knex/models/Teams';
import UserCommands from '~/lib/UserCommands';

export default async function handler(req, res) {
    let userId;
    try {
        Utils.doParametersExist(['userId'], req.body, 'MISSING_PARAMETER');
        userId = req.body.userId;
    }
    catch(err) {
        res.json({error: Errors.getError(err, req.headers.errors)});
        return res.end();
    }

    const teams = await Teams.query().select('name')
        .where('userId', userId);
        
    await UserCommands.update(userId, [
        { rowName: 'nextCommand', value: 'teams/QueryTeam' }
    ]);

    res.json(teams);
    res.end();
}