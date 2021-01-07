const { Model } = require('objection');

class Mail extends Model {
	static get tableName() {
		return 'mail';
    }
}

module.exports = Mail;