import Utils from '~/lib/Utils';
import Errors from '~/lib/Errors';
import '~/lib/Database';
import User from '~/knex/models/User';
import CustomError from '~/lib/errors/CustomError';
import Teams from '~/lib/Teams';

export default async function handler(req, res) {
    let userId;
    try {
        Utils.doParametersExist(['userId'], req.body, 'MISSING_PARAMETER');
        userId = req.body.userId;

        await canSelectTeam(userId);

    }
    catch(err) {
        res.json({error: Errors.getError(err, req.headers.errors)});
        return res.end();
    }

    await User.query().update({
        nextCommand: 'team/SelectTeam'
    })
    .where('userId', userId);

    res.json(Teams.teams);
    res.end();
}

async function canSelectTeam(userId) {
    const { team, level } = await User.query().select('team', 'level')
        .where('userID', userId).first();

    if(team) {
        throw new CustomError('ALREADY_SELECTED_TEAM');
    }

    if(level < 5) {
        throw new CustomError('TEAM_LEVEL_TOO_LOW');
    }

    return true;
}