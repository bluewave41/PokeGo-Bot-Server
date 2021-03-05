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
		minWidth: 125,
		display: 'inline-block',
		margin: '7px',
		backgroundColor: '#3e3636',
		color: 'white',
	},
	title: {
		fontSize: '18px',
		textAlign: 'center',
	},
	pos: {
		marginBottom: 12,
	},
	media: {
        width: '128px',
        height: '128px',
		margin: 'auto',
	},
	content: {
		textAlign: 'center',
        padding: 0
	},
	favorite: {
		position: 'absolute',
		color: 'yellow',
	},
    zeroStar: {
        color: 'red'
    },
    oneStar: {
        color: 'orange'
    },
    twoStar: {
        color: 'yellow'
    },
    threeStar: {
        color: 'green'
    },
    fourStar: {
        color: 'blue'
    }
});

export default function PokemonCard(props) {
	const classes = useStyles();
	const [id, setId] = useState(props.pokemon.pokemonId);

    let color;

    if(props.pokemon.totaliv <= 48.9) {
        color = 'zeroStar';
    }
    else if(props.pokemon.totaliv <= 64.4) {
        color = 'oneStar';
    }
    else if(props.pokemon.totaliv <= 80) {
        color = 'twoStar';
    }
    else if(props.pokemon.totaliv <= 97.8) {
        color = 'threeStar';
    }
    else {
        color = 'fourStar';
    }
	  
	function onClick() {
		props.onAdd(id);
	}

	return (
		<>
			<Card className={classes.root}>
				{props.pokemon.favorite ? <StarIcon className={classes.favorite}/> : null}
				<CardHeader
                    classes={{
                        title: classes.title
                    }}
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
					<Typography variant="h6" component="h2" className={classes[color]}>
						{props.pokemon.name}
					</Typography>
				</CardContent>
			</Card>
		</>
	);
}
