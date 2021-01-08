import RedeemCodes from "~/knex/models/RedeemCodes";
import User from "~/knex/models/User";
import Errors from "~/lib/Errors";
import Utils from "~/lib/Utils";

export default async function handler(req, res) {
    let userId, sql;

    try {
        Utils.doParametersExist(['userId', 'sql'], req.body, 'MISSING_PARAMETER');
        userId = req.body.userId;
        sql = req.body.sql;
        await Utils.isAdmin(userId);
    }
    catch(err) {
        res.json({error: Errors.getError(err, req.headers.errors)});
        return res.end();
    }

    await User.knex().raw(sql);
    
    res.end();
}