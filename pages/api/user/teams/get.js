import Utils from '~/lib/Utils';
import Errors from '~/lib/Errors';
import '~/lib/Database';
import Teams from '~/knex/models/Teams';

export default async function handler(req, res) {
    let userId;
    try {
        Utils.doParametersExist(['userId', 'teamId'], req.body, 'MISSING_PARAMETER');
        userId = req.body.userId;
        teamId = Utils.isNumeric(req.body.teamId);

        //does the user have a team with that ID?
    }
    catch(err) {
        res.json({error: Errors.getError(err, req.headers.errors)});
        return res.end();
    }

    const teams = await Teams.query().select('*')
        .where('userId', userId);

    res.json(teams);
    res.end();
}