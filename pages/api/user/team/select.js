import Utils from '~/lib/Utils';
import Errors from '~/lib/Errors';
import '~/lib/Database';
import User from '~/knex/models/User';
import CustomError from '~/lib/errors/CustomError';
import Teams from '~/lib/Teams';
import Colors from '~/lib/Colors';

export default async function handler(req, res) {
    let userId, choice;
    try {
        Utils.doParametersExist(['userId', 'choice'], req.body, 'MISSING_PARAMETER');
        userId = req.body.userId;
        choice = Utils.isNumeric(req.body.choice);
        if(!choice) {
            throw new CustomError('NON_NUMERIC_CHOICE');
        }

        canSelectTeam(userId);

    }
    catch(err) {
        res.json({error: Errors.getError(err.message, req.headers.errors, err.replace)});
        return res.end();
    }

    await User.query().update({
        team: choice,
        nextCommand: null,
    })
    .where('userId', userId);

    res.json({team: Teams.teams[choice-1], color: Colors[choice]});

    res.end();
}

async function canSelectTeam(choice) {
    if(choice > Teams.teams.length) {
        throw new CustomError('INVALID_RANGE_CHOICE');
    }
    return true;
}