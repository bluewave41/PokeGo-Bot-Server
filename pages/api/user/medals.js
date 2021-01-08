import Utils from '~/lib/Utils';
import '~/lib/Database';
import Errors from '~/lib/Errors';
import MedalCommands from '~/lib/MedalCommands';

export default async function handler(req, res) {
    let userId;

    try {
        Utils.doParametersExist(['userId'], req.body);
        userId = req.body.userId;
    }
    catch(err) {
        res.json({error: Errors.getError(err, req.headers.errors)});
        return res.end();
    }

    const medals = await MedalCommands.getMedals(userId);

    res.json(medals);

    res.end();
}