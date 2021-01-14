import Utils from '~/lib/Utils';
import Errors from '~/lib/Errors';
import '~/lib/Database';
import TeamEdits from '~/knex/models/TeamEdits';

export default async function handler(req, res) {
    let userId, slot;
    try {
        Utils.doParametersExist(['userId', 'slot'], req.body, 'MISSING_PARAMETER');
        userId = req.body.userId;
        slot = Utils.isNumeric(req.body.slot);
        if(slot > 3) {
            throw new CustomError('INVALID_RANGE_CHOICE', 3);
        }
    }
    catch(err) {
        res.json({error: Errors.getError(err, req.headers.errors)});
        return res.end();
    }

    const team = await TeamEdits.query().select('teamId')
        .withGraphFetched('team')
        .where('userId', userId);
    
    if(!team) {
        //error but realistically this shouldn't happen
    }

    await TeamEdits.query().update({
        slot: slot
    })
    .where('userId', userId);

    //show pokemon list sorted by CP with reactions to move pages?

    console.log(team);

    //res.json(teams);
    res.end();
}