import Utils from '~/lib/Utils';
import Errors from '~/lib/Errors';
import '~/lib/Database';
import MailCommands from '~/lib/MailCommands';
import UserCommands from '~/lib/UserCommands';

export default async function handler(req, res) {
    let userId, tableId;
    try {
        Utils.doParametersExist(['userId', 'tableId'], req.body, 'MISSING_PARAMETER');
        userId = req.body.userId;
        tableId = Utils.isNumeric(req.body.tableId, 'NON_NUMERIC_MAIL_ID');
        if(!tableId) {
            throw new CustomError('NON_NUMERIC_MAIL_ID');
        }
    }
    catch(err) {
        res.json({error: Errors.getError(err, req.headers.errors)});
        return res.end();
    }

    const mail = await MailCommands.getMailBody(userId, tableId);

    await UserCommands.saveInfo(userId, tableId);

    res.json(mail);
    res.end();
}