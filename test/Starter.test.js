const assert = require('assert');
const axios = require('./axios');
const Message = require('./Message');
const UserCommands = require('../lib/UserCommands');
const handler = '../pages/api/starter/list';

describe('StarterCommand', function() {
	beforeEach(async function() {
		await UserCommands.reset(1000);
	});
	
	it('Should return a list of starters', async function() {
		const { req, res } = createMocks({
			method: "POST",
			query: {
				userId: 1
			}
		});
		await handler(req, res);
		console.log(res);

	})
	/*it('Should return list with extra parameters', async function() {
		let message = new Message('>starter 1');
        let response = await CommandParser.parse(message);
		assert(response.description = 'Select a Pokemon:');
	})
	it('Should give a starter if one is specified', async function() {
		let message = new Message('>starter');
        let response = await CommandParser.parse(message);
		message = new Message('squirtle');
		response = await CommandParser.parse(message);
		assert(response.description == 'Congratulations! You obtained a level 1 Squirtle!');
		message = new Message('>list');
		response = await CommandParser.parse(message);
		console.log(response.description.split('\n'));
	})*/
})