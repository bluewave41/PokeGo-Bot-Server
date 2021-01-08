import Utils from '~/lib/Utils';
import Errors from '~/lib/Errors';
import '~/lib/Database';
import MailCommands from '~/lib/MailCommands';
import UserCommands from '~/lib/UserCommands';

export default async function handler(req, res) {
    let userId;
    try {
        Utils.doParametersExist(['userId'], req.body, 'MISSING_PARAMETER');
        userId = req.body.userId;
    }
    catch(err) {
        res.json({error: Errors.getError(err, req.headers.errors)});
        return res.end();
    }

    await UserCommands.update(userId, [
        { rowName: 'nextCommand', value: 'mail/OpenMail' }
    ]);

    const mail = await MailCommands.getMailTitles(userId);

    res.json(mail);
    res.end();
}