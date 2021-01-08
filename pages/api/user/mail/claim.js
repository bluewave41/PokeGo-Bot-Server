import Utils from '~/lib/Utils';
import Errors from '~/lib/Errors';
import '~/lib/Database';
import MailCommands from '~/lib/MailCommands';
import InventoryCommands from '~/lib/InventoryCommands';
import Mail from '~/knex/models/Mail';

export default async function handler(req, res) {
    let userId, tableId, mail;
    try {
        Utils.doParametersExist(['userId', 'tableId'], req.body, 'MISSING_PARAMETER');
        userId = req.body.userId;
        tableId = Utils.isNumeric(req.body.tableId, 'NON_NUMERIC_MAIL_ID');
        if(!tableId) {
            throw new CustomError('NON_NUMERIC_MAIL_ID');
        }
        mail = await MailCommands.getRewards(userId, tableId);
    }
    catch(err) {
        res.json({error: Errors.getError(err, req.headers.errors)});
        return res.end();
    }

    for(var i=0;i<mail.rewards.length;i++) {
        await InventoryCommands.addItems(userId, mail.rewards[i].id, mail.rewards[i].amount);
    }

    await Mail.query().update({
        claimedrewards: true
    })
    .where('id', mail.id);

    //items were given

    res.json(mail.rewards);

    res.end();
}