import Utils from '~/lib/Utils';
import Errors from '~/lib/Errors';
import '~/lib/Database';
import InventoryCommands from '~/lib/InventoryCommands';
import Mail from '~/knex/models/Mail';
import MailCommands from '~/lib/MailCommands';
import UserCommands from '~/lib/UserCommands';
import CustomError from '~/lib/errors/CustomError';

export default async function handler(req, res) {
    let userId, mailId, rewards;
    try {
        Utils.doParametersExist(['userId', 'choice'], req.body);
        userId = req.body.userId;

        if(req.body.choice != 'claim') {
            throw new CustomError('INVALID_RESPONSE');
        }

        mailId = await UserCommands.getSavedVariable(userId);

        rewards = await MailCommands.getRewards(userId, mailId);
    }
    catch(err) {
        res.json({error: Errors.getError(err, req.headers.errors)});
        return res.end();
    }

    for(var i=0;i<rewards.length;i++) {
        let reward = rewards[i];
        await InventoryCommands.addItems(userId, reward.itemId, reward.amount);
    }

    //update mail flag
    await Mail.query().update({
        claimedrewards: true
    })
    .where('id', mailId);

    //update user status
    await UserCommands.update(userId, [
        { rowName: 'nextCommand', value: null },
        { rowName: 'savedVariable', value: null }
    ]);

    //items were given

    res.json(rewards);

    res.end();
}