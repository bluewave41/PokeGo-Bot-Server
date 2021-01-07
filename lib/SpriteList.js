class SpriteList {
    constructor() {
        this.sprites = [];
    }
    addSprites(sprites, type) {
        sprites.forEach(el => el.type = type);
        this.sprites.push(...sprites);
    }
    get length() {
        return this.sprites.length;
    }
}

module.exports = SpriteList;