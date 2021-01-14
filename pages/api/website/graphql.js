const { ApolloServer } = require('apollo-server-micro');
const { typeDefs: PokemonSchema } = require('./schemas/pokemon.js');
const { mergeResolvers } = require('@graphql-tools/merge');
const Pokemon = require('~/knex/models/Pokemon');
require('~/lib/Database');

const Query = `
	type Query {
		getAllPokemon(userId: Int!): [Pokemon]
	}
	type Mutation {
		updateFavorites(pokemonIds: [Int!]!) : [Int]
	}
`;

const resolvers = {
	Query: {
		getAllPokemon: async (_, args) => {
			return await Pokemon.query().select('*')
				.where('ownerId', args.userId);
		},
	},
	Mutation: {
		updateFavorites: async (_, args) => {
			console.log(args);
		}
	}
}

const server = new ApolloServer({
	typeDefs: [Query, PokemonSchema],
	resolvers: mergeResolvers([resolvers]),
})

console.log(server)

export const config = {
	api: {
		bodyParser: false
	}
};

export default server.createHandler({ path: '/api/website/graphql' });