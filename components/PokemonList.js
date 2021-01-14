import { useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PokemonCard from './PokemonCard';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';
import axios from 'axios';
import Badge from '@material-ui/core/Badge';

const useStyles = makeStyles({
	message: {
		padding: '36px',
		textAlign: 'center',
	},
	transferButton: {
		position: 'fixed',
	},
	stickyFooter: {
		width: '100%',
		position: 'fixed',
		bottom: 0,
		backgroundColor: '#52057b',
		"& > *": {
			color: 'white',
		}
	},
	icon: {
		color: 'white',
	}
});

export default function PokemonList(props) {
	const classes = useStyles();
	const [selected, setSelected] = useState([]);
	const [showSuccess, setShowSuccess] = useState(false);
    const [pokemon, setPokemon] = useState(props.pokemon);
    const [message, setMessage] = useState('');
    const [canTransfer, setCanTransfer] = useState(true);
		
	function onAdd(pokemonId) {
		let copy = selected.slice(0);
		if(copy.includes(pokemonId)) {
			copy = copy.filter(el => el != pokemonId);
		}
		else {
			copy.push(pokemonId);
        }
        setSelected(copy);
        
        let flag = true;
        for(var i=0;i<copy.length;i++) {
            let p = pokemon.find(el => el.pokemonId == copy[i]);
            if(p.favorite) {
                flag = false;
                break;
            }
        }
        setCanTransfer(flag);
	}
	
	function handleClose() {
		setShowSuccess(false);
	}

	return (
		<div>
			{ pokemon.map(el => <PokemonCard pokemon={el} onAdd={onAdd} key={el.pokemonId} active={selected.includes(el.pokemonId)}/>) }
			
			{selected.length ?
				<BottomNavigation
					className={classes.stickyFooter}
					onChange={(event, newValue) => {
						console.log(newValue);
						if(newValue == 1) { //favorite
							axios.post('/api/website/favoriteMultiple', { selected: selected }).then(function(response) {
                                console.log(response);
                                if(response.status == 200) {
                                    setMessage(response.data.changed + ' Pokemon favorited!');
                                    setShowSuccess(true);
                                    let copy = [...pokemon];
                                    for(var i=0;i<copy.length;i++) {
                                        if(selected.includes(copy[i].pokemonId)) {
                                            copy[i].favorite = !copy[i].favorite;
                                        }
                                    }
                                    setPokemon(copy);
                                    setSelected([]);
                                }
							});
						}
						else if(newValue == 0) { //transfer
                            axios.post('/api/website/transferMultiple', { selected: selected}).then(function(response) {
                                if(response.status == 200) {
                                    setMessage(response.data.changed + ' Pokemon transfered!');
                                    setShowSuccess(true);
                                    setPokemon(pokemon.filter(el => !selected.includes(el.pokemonId)));
                                    setSelected([]);
                                }
                            });
						}
					}}
					showLabels
				>
                    { canTransfer ? 
                        <BottomNavigationAction label="Transfer" icon={
                            <Badge badgeContent={selected.length} color='error'>
                                <DeleteIcon className={classes.icon}/> 
                            </Badge>} />
                        : null }
					    <BottomNavigationAction label="Favorite" icon={
                            <Badge badgeContent={selected.length} color='error'>   
                                <FavoriteIcon className={classes.icon}/>
                            </Badge>
                        } />
				</BottomNavigation>
				: null
			}
			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				open={showSuccess}
				autoHideDuration={6000}
				onClose={handleClose}
				message={message}
			/>
		</div>
	);
}