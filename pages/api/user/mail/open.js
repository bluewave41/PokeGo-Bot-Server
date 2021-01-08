import Utils from '~/lib/Utils';
import Errors from '~/lib/Errors';
import '~/lib/Database';
import MailCommands from '~/lib/MailCommands';
import PlayerMail from '~/knex/models/PlayerMail';

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

    await PlayerMail.query().insert({
        userId: userId,
        mailId: mail.id
    });

    res.json(mail);
    res.end();
}