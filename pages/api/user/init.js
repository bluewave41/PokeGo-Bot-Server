const User = require('~/knex/models/User');
import Colors from '~/lib/Colors';
import '~/lib/Database';

export default async function handler(req, res) {
    let user = await User.query().select('userId', 'nextCommand', 'location', 'lastMessageId', 'gotStarter', 'team')
        .where('discordID', req.body.discordID).first();
    if(!user) {
        user = await User.query().insert({
            discordID: req.body.discordID,
            username: req.body.username,
            discriminator: req.body.discriminator,
            currency: 500,
            stardust: 5000,
            secretId: Math.floor(Math.random() * 500) + 1,
        });
    };
	res.json({
        userId: user.userId,
        nextCommand: user.nextCommand,
        location: user.location,
        lastMessageId: user.lastMessageId,
        gotStarter: user.gotStarter,
        team: user.team,
        color: Colors[user.team],
	});
}