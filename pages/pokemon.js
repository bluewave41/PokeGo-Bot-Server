import Head from 'next/head'
import '@fontsource/roboto'
import { applySession } from 'next-session';
import PokemonList from '../components/PokemonList';
const Pokemon = require('~/knex/models/Pokemon');

export default function Home(props) {
	return (
		<div>
			<Head>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
			</Head>
			<PokemonList pokemon={props.pokemon}/>
		</div>
	);
}

export async function getServerSideProps({ req, res }) {
	await applySession(req, res);
	let pokemon = await Pokemon.query().select('*')
		.where('ownerId', req.session.user.userId);
	pokemon = pokemon.map(el => el.toJSON());
	return {
		props: {
			avatar: `https://cdn.discordapp.com/avatars/${req.session.user.id}/${req.session.user.avatar}`,
			username: req.session.user.username,
			pokemon: pokemon,
		}
	}
}