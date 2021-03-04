import '@fontsource/roboto'
import { applySession } from 'next-session';
import PokemonList from '../components/PokemonList';
import { makeStyles } from '@material-ui/core/styles';
const Pokemon = require('~/knex/models/Pokemon');

const useStyles = makeStyles((theme) => ({
    content: {
        ...theme.content,
        paddingBottom: '75px',
    },
    toolbar: theme.mixins.toolbar,
}));

export default function Home(props) {
    const classes = useStyles();
	return (
		<div className={classes.root}>
            <main className={classes.content}>
                <div className={classes.toolbar} />
			    <PokemonList pokemon={props.pokemon}/>
            </main>
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
    if(!req.session.user.userId) {
        return {
            props: {
                pokemon: []
            }
        }
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