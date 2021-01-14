import Utils from '~/lib/Utils';
import Errors from '~/lib/Errors';
import '~/lib/Database';
import MailCommands from '~/lib/MailCommands';
import CustomError from '~/lib/errors/CustomError';
import UserCommands from '~/lib/UserCommands';

export default async function handler(req, res) {
    let userId, tableId;
    try {
        Utils.doParametersExist(['userId', 'tableId'], req.body, 'MISSING_PARAMETER');
        userId = req.body.userId;
        tableId = Utils.isNumeric(req.body.tableId);
        if(!tableId) {
            throw new CustomError('NON_NUMERIC_MAIL_ID');
        }
    }
    catch(err) {
        res.json({error: Errors.getError(err, req.headers.errors)});
        return res.end();
    }

    const mail = await MailCommands.getMailBody(userId, tableId);

    await UserCommands.update(userId, [
        { rowName: 'nextCommand', value: 'mail/ClaimRewards' },
        { rowName: 'savedVariable', value: mail.id }
    ]);

    res.json(mail);
    res.end();
}