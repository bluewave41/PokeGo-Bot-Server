const UserCommands = require("../UserCommands")
const Item = require('./Item');

class RazzBerry extends Item {
    constructor() {
        super(7, 'Razz Berry', 'razzberry', 'Pokemon Storage', '<:pokemonstorage:726077103975432243>',
         'Increases your Pokemon Storage by 50.', true, 500, 0, false, 0);
    }
    async buy(userId) {
        await UserCommands.update(userId, [
            {rowName: 'storage', value: 50, flag: 'increment'}
        ]);
    }
}

module.exports = new RazzBerry();