module.exports = {
	typeDefs: `
		type Pokemon {
			ownerId: Int!
			pokemonId: Int!
			pokedexId: Int!
			name: String
			cp: Int!
			hp: Int!
			maxHP: Int!
			hpiv: Int!
			atkiv: Int!
			defiv: Int!
			fastMove: Int!
			chargeMove: Int!
			level: Int!
			favorite: Boolean!
			shiny: Boolean!
			gender: Boolean
			totaliv: Float!
			path: String
		}
	`,
}