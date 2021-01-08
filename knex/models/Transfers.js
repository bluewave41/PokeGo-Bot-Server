const { Model } = require('objection');

class Transfers extends Model {
	static get tableName() {
		return 'transfers';
    }
}

module.exports = Transfers;