import RedeemCodes from "~/knex/models/RedeemCodes";
import Errors from "~/lib/Errors";
import Utils from "~/lib/Utils";

export default async function handler(req, res) {
    let userId, rewards;

    try {
        Utils.doParametersExist(['userId', 'rewards'], req.body, 'MISSING_PARAMETER');
        userId = req.body.userId;
        rewards = req.body.rewards;
        await Utils.isAdmin(userId);
    }
    catch(err) {
        res.json({error: Errors.getError(err.message, req.headers.errors, err.replace)});
        return res.end();
    }

    const column = await RedeemCodes.query().insertAndFetch({
        redeemId: Utils.generateRandomString(20),
        rewards: JSON.stringify(rewards),
    });

    res.send(column);
    
    res.end();
}