const PokemonData = require('./PokemonData');
const MoveList = require('./MoveList');
const PowerupTable = require('./PowerupTable');
const Pokemon = require('~/knex/models/Pokemon');

module.exports = {
	generatePokemon(pokedexId, level, ownerId, flags) {
		let pokemon = {
            name: PokemonData[pokedexId].name,
			pokedexId: pokedexId,
			level: level,
			shiny: this.calculateShiny(),
            gender: this.isFemale(pokedexId),
            ownerId: ownerId,
        }
        this.calculateIVs(pokemon);
		
		this.calculateCP(pokemon);
		this.calculateHP(pokemon);

        if(flags) {
            const keys = Object.keys(flags);
            for(var i=0;i<keys.length;i++) {
                pokemon[keys[i]] = flags[keys[i]];
            }
        }
        this.getMoves(pokemon);
        
        return Pokemon.fromJson(pokemon);
    },
	calculateHP(pokemon) {
        const base = PokemonData[pokemon.pokedexId];
        const row = PowerupTable.find(el => el.level == pokemon.level);
		pokemon.hp = Math.floor((base.hp + pokemon.hpiv) * row.multiplier);
	},
    calculateCP(pokemon) {
        const base = PokemonData[pokemon.pokedexId];
        const attack = base.attack + pokemon.atkiv;
        const defense = Math.pow(base.defense + pokemon.defiv, 0.5);
        const hp = Math.pow(base.hp + pokemon.hpiv, 0.5);

        const powerupRow = PowerupTable.find(el => el.level == pokemon.level);
		
        pokemon.cp = Math.floor((attack * defense * hp) * Math.pow(powerupRow.multiplier, 2) / 10);
    },
	calculateIVs(pokemon) {
		pokemon.hpiv = Math.floor((Math.random() * 15));
		pokemon.atkiv = Math.floor((Math.random() * 15));
		pokemon.defiv = Math.floor((Math.random() * 15));
        return pokemon;
	},
    calculateTotalIV(pokemon) {
        let total = 48;
        let sum = pokemon.hpiv + pokemon.atkiv + pokemon.defiv;
        return ((sum / total) * 100).toFixed(2);
    },
	calculateShiny() {
		return Math.floor(Math.random() * 1001) == 1000;
	},
	isFemale(pokedexId) {
        let rate = PokemonData[pokedexId].gender_rate;
        if(rate == -1) {
            return null;
        }
        let femaleRate = rate/8;
        return Math.random() < femaleRate;
    },
    getMoves(pokemon) {
        const fastMoves = PokemonData[pokemon.pokedexId].fastMoves.filter(el => !MoveList[el].isLegacy);
        const chargeMoves = PokemonData[pokemon.pokedexId].chargeMoves.filter(el => !MoveList[el].isLegacy);

        pokemon.fastMove = fastMoves[Math.floor(Math.random() * fastMoves.length)];
        pokemon.chargeMove = chargeMoves[Math.floor(Math.random() * chargeMoves.length)];
    }
}