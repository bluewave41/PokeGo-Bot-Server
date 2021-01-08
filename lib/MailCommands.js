const Mail = require("~/knex/models/Mail");
const MailRewards = require("~/knex/models/MailRewards");
const PlayerMail = require("~/knex/models/PlayerMail");
const Emojis = require("./Emojis");
const CustomError = require("./errors/CustomError");
const ItemList = require("./ItemList");
const LevelTable = require("./LevelTable");

module.exports = {
    async addLevelUpMail(userId, level) {
        const message = `Congratulations! You're now level ${level}. You can claim your rewards attached to this message.`;
        let rewards = LevelTable[level-1].rewards;

        const mail = await Mail.query().insert({
            userId: userId,
            title: `Level ${level}!`,
            message: message,
        });

        rewards.forEach(el => el.mailId = mail.id);

        await MailRewards.knex().table('mail_rewards').insert(rewards);
    },
    async addTeamMail(userId) {
      const message = `Congratulations! You've reached level 5 and can now select a team. There are 3 teams for you to chose from:\n\
      Valor ${Emojis.VALOR}\nMystic ${Emojis.MYSTIC}\nInstinct ${Emojis.INSTINCT}\n\nYou can select a team with the team command`;
      
      await Mail.query().insert({
          userId: userId,
          title: 'Select a team!',
          message: message
      });
    },
    async getMailTitles(userId) {
        const mail = await Mail.query().select('title', 'read', 'claimedrewards')
            .where('userId', userId);
        return mail;
    },
    async getMailBody(userId, tableId) {
        tableId -= 1; //adjust for index starting at 0
        const allMail = await Mail.query().select('id', 'title', 'message')
            .withGraphFetched('rewards')
            .where('userId', userId);

        if(tableId > allMail.length) {
            throw new CustomError('NO_MAIL', tableId);
        }

        const mail = allMail[tableId];

        await Mail.query().update({
            read: true,
        })
        .where('id', mail.id);

        //fix rewards
        mail.rewards = ItemList.rewardsToMessage(mail.rewards);

        return mail;
    },
    async getRewards(userId) {
        const playerMail = await PlayerMail.query().select('mailId')
            .withGraphFetched('rewards')
            .withGraphFetched('mail')
            .where('userId', userId)
            .first();

        if(playerMail.mail.claimedrewards) {
            throw new CustomError('ALREADY_CLAIMED');
        }

        playerMail.rewards = ItemList.rewardsToMessage(playerMail.rewards);

        return playerMail;
    }
}