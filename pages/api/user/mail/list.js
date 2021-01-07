import Utils from '~/lib/Utils';
import Errors from '~/lib/Errors';
import '~/lib/Database';
import MailCommands from '~/lib/MailCommands';

export default async function handler(req, res) {
    let userId;
    try {
        Utils.doParametersExist(['userId'], req.body, 'MISSING_PARAMETER');
        userId = req.body.userId;
    }
    catch(err) {
        res.json({error: Errors.getError(err.message, req.headers.errors, err.replace)});
        return res.end();
    }

    const mail = await MailCommands.getMailTitles(userId);

    res.json(mail);
    res.end();
}