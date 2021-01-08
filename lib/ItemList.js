const CustomError = require('./errors/CustomError');
const Items = require('./items').items;

module.exports = {
    getPokestopItems(level) {
        return Items.filter(el => el.fromPokestop && el.requiredLevel <= level);
    },
    getItem(itemToFind) {
        let item;
        if(Number.isInteger(parseInt(itemToFind))) {
            item = Items.find(el => el.id == itemToFind);
        }
        else {
            item = Items.find(el => el.searchName.toLowerCase().includes(itemToFind.toLowerCase()));
        }
        if(!item) {
            throw new CustomError('NO_ITEM_EXISTS', itemToFind);
        }
        return item;
    },
    getItemsInShop(level) {
        return Items.filter(el => el.shopItem && el.requiredLevel <= level);
    },
    rewardsToMessage(rewards) {
        let rewardsArray = [];
        for(var i=0;i<rewards.length;i++) {
            const item = Items.find(el => el.id == rewards[i][0]);
            rewardsArray.push({name: item.name, amount: rewards[i][1], id: rewards[0]});
        }
        return rewardsArray;
    }
}