const { Model } = require('objection');

class PlayerMail extends Model {
	static get tableName() {
		return 'player_mail';
    }
    static get relationMappings() {
        const MailRewards = require('~/knex/models/MailRewards');
        const Mail = require('~/knex/models/Mail');
        return {
            rewards: {
                relation: Model.HasManyRelation,
                modelClass: MailRewards,
                join: {
                    from: 'player_mail.mailId',
                    to: 'mail_rewards.mailId',
                }
            },
            mail: {
                relation: Model.BelongsToOneRelation,
                modelClass: Mail,
                join: {
                    from: 'player_mail.mailId',
                    to: 'mail.id',
                }
            }
        }
    }
}

module.exports = PlayerMail;