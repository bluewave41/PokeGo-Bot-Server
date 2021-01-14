import Utils from '~/lib/Utils';
import Errors from '~/lib/Errors';
import '~/lib/Database';
import Teams from '~/knex/models/Teams';
import TeamEdits from '~/knex/models/TeamEdits';
import UserCommands from '~/lib/UserCommands';

export default async function handler(req, res) {
    let userId, name;
    try {
        Utils.doParametersExist(['userId', 'name'], req.body, 'MISSING_PARAMETER');
        userId = req.body.userId;
        name = Utils.sanitizeString(req.body.name);
    }
    catch(err) {
        res.json({error: Errors.getError(err, req.headers.errors)});
        return res.end();
    }

    let { highest } = await Teams.query().max('teamId as highest')
        .where('userId', userId);

    if(!highest) {
        highest = 0;
    }

    const team = await Teams.query().insert({
        userId: userId,
        teamId: highest+1,
        name: name
    });

    await UserCommands.update(userId, [
        { rowName: 'nextCommand', value: 'teams/SelectSlot' },
        { rowName: 'savedVariable', value: team.teamId }
    ]);

    res.json(team);
    res.end();
}