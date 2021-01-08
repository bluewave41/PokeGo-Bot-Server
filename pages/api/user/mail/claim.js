import Utils from '~/lib/Utils';
import Errors from '~/lib/Errors';
import '~/lib/Database';
import InventoryCommands from '~/lib/InventoryCommands';
import Mail from '~/knex/models/Mail';
import MailCommands from '~/lib/MailCommands';
import UserCommands from '~/lib/UserCommands';
import PlayerMail from '~/knex/models/PlayerMail';
import CustomError from '~/lib/errors/CustomError';

export default async function handler(req, res) {
    //handle differently for website
    let userId, mail;
    if(req.headers.client == 'discord') {
        try {
            Utils.doParametersExist(['userId', 'choice'], req.body);
            userId = req.body.userId;

            if(req.body.choice != 'claim') {
                throw new CustomError('INVALID_RESPONSE');
            }

            mail = await MailCommands.getRewards(userId);
        }
        catch(err) {
            res.json({error: Errors.getError(err, req.headers.errors)});
            return res.end();
        }
    }

    for(var i=0;i<mail.rewards.length;i++) {
        let reward = mail.rewards[i];
        console.log(reward)
        await InventoryCommands.addItems(userId, reward.itemId, reward.amount);
    }

    //update mail flag
    await Mail.query().update({
        claimedrewards: true
    })
    .where('id', mail.mailId);

    //update user status
    await UserCommands.update(userId, [
        { rowName: 'nextCommand', value: null }
    ]);

    //remove player_mail entry
    await PlayerMail.query().delete()
        .where('userId', userId);

    //items were given

    res.json(mail.rewards);

    res.end();
}