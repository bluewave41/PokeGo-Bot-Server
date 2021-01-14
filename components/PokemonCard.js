import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import StarIcon from '@material-ui/icons/Star';

const useStyles = makeStyles({
	root: {
		minWidth: 175,
		display: 'inline-block',
		height: '191px',
		margin: '7px',
		backgroundColor: '#3e3636',
		color: 'white',
	},
	title: {
		fontSize: 14,
		textAlign: 'center',
	},
	pos: {
		marginBottom: 12,
	},
	media: {
		width: '30%',
		margin: 'auto',
	},
	content: {
		textAlign: 'center',
	},
	favorite: {
		position: 'absolute',
		color: 'yellow',
	}
});

export default function PokemonCard(props) {
	const classes = useStyles();
	const [id, setId] = useState(props.pokemon.pokemonId);
	  
	function onClick() {
		props.onAdd(id);
	}

	return (
		<>
			<Card className={classes.root}>
				{props.pokemon.favorite ? <StarIcon className={classes.favorite}/> : null}
				<CardHeader
					className={classes.title}
					title={`CP: ${props.pokemon.cp}`}
					action={props.active ? <AddIcon color='secondary' onClick={onClick}/> : <AddIcon onClick={onClick}/>}
				/>
				<CardMedia
					className={classes.media}
					component='img'
					image={props.pokemon.path}
					title={props.pokemon.name}
				/>
				<CardContent className={classes.content}>
					<Typography variant="h5" component="h2">
						{props.pokemon.name}
					</Typography>
				</CardContent>
			</Card>
		</>
	);
}
