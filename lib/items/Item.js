class Item {
    constructor(id, name, searchName, plural, emoji, description, shopItem, price, sellPrice, fromPokestop, requiredLevel) {
        this.id = id;
        this.name = name;
        this.searchName = searchName;
        this.plural = plural;
        this.emoji = emoji;
        this.description = description;
        this.shopItem = shopItem;
        this.price = price;
        this.sellPrice = sellPrice;
        this.fromPokestop = fromPokestop;
        this.requiredLevel = requiredLevel;
    }
}

module.exports = Item;