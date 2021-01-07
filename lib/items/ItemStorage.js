const UserCommands = require("../UserCommands")
const Item = require('./Item');

class ItemStorage extends Item {
    constructor() {
        super(5, 'Item Storage', 'itemstorage', 'Item Storage', '<:bagupgrade:794287709665099780>',
         'Increases your Item Storage by 50.', true, 500, 0, false, 0);
    }
    async buy(userId) {
        await UserCommands.update(userId, [
            {rowName: 'itemstorage', value: 50, flag: 'increment'}
        ]);
    }
}

module.exports = new ItemStorage();