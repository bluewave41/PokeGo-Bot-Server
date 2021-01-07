const PokemonData = require('~/lib/PokemonData');
const PowerupTable = require('~/lib/PowerupTable');
const Pokemon = require('./Pokemon');

class CurrentEncounters extends Pokemon {
	static get tableName() {
		return 'current_encounters';
    }
    static get virtualAttributes() {
        return ['url', 'emoji', 'name'];
    }
    calculateCP() {
        const base = PokemonData[this.pokedexId];
        const attack = base.attack + this.atkiv;
        const defense = Math.pow(base.defense + this.defiv, 0.5);
        const hp = Math.pow(base.hp + this.hpiv, 0.5);
            
        let cp = Math.floor((attack * defense * hp) * Math.pow(PowerupTable[this.level].multiplier, 2) / 10);
        if(cp < 10) {
            cp = 10;
        }
        return cp;
    }
}

module.exports = CurrentEncounters;