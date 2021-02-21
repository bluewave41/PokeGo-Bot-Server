import '@fontsource/roboto'
import { applySession } from 'next-session';
import PokemonList from '../components/PokemonList';
const Pokemon = require('~/knex/models/Pokemon');

export default function Home(props) {
	return (
		<div>
			<PokemonList pokemon={props.pokemon}/>
		</div>
	);
}

export async function getServerSideProps({ req, res }) {
	await applySession(req, res);
    if(!req.session.user) {
        res.setHeader('location', '/');
        res.statusCode = 302;
        return res.end();
    }
	let pokemon = await Pokemon.query().select('*')
		.where('ownerId', req.session.user.userId);
	pokemon = pokemon.map(el => el.toJSON());
	return {
		props: {
			pokemon: pokemon,
		}
	}
}