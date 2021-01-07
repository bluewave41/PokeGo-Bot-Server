const Mail = require("~/knex/models/Mail");
const Emojis = require("./Emojis");
const CustomError = require("./errors/CustomError");
const ItemList = require("./ItemList");
const LevelTable = require("./LevelTable");

module.exports = {
    async addLevelUpMail(userId, level) {
        const message = `Congratulations! You're now level ${level}. You can claim your rewards attached to this message.`;
        await Mail.query().insert({
            userId: userId,
            title: `Level ${level}!`,
            message: message,
            rewards: JSON.stringify(LevelTable[level-1].rewards)
        });
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
        const mail = await Mail.query().select('id', 'title', 'read', 'claimedrewards')
            .where('userId', userId);
        return mail;
    },
    async getMailBody(userId, tableId) {
        tableId -= 1; //adjust for index
        const allMail = await Mail.query().select('id', 'title', 'message', 'rewards')
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
        mail.rewards = ItemList.rewardsToMessage(JSON.parse(mail.rewards));

        return mail;
    },
    async getRewards(userId, tableId) {
        tableId -= 1;
        const allMail  = await Mail.query().select('id', 'rewards', 'claimedrewards')
            .where('userId', userId);

        if(tableId > allMail.length) {
            throw new CustomError('NO_MAIL', tableId);
        }

        const mail = allMail[tableId];

        if(mail.claimedrewards) {
            throw new CustomError('ALREADY_CLAIMED');
        }

        mail.rewards = ItemList.rewardsToMessage(JSON.parse(mail.rewards));

        return mail;
    }
}