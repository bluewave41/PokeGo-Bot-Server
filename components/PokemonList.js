import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PokemonSearch from '../components/PokemonSearch';
import PokemonCard from './PokemonCard';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';
import axios from 'axios';
import Badge from '@material-ui/core/Badge';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
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
        },
        [theme.breakpoints.up('md')]: {
            marginLeft: '-10px',
            width: `calc(100% - ${theme.drawerWidth}px)`,
        },
    },
    snackbarMargin: {
        [theme.breakpoints.up('md')]: {
            marginLeft: `${theme.drawerWidth / 2}px`,
        },
    },
    icon: {
        color: '#FFF',
    },
    content: {
        ...theme.content,
        paddingBottom: '75px',
    },
    hide: {
        visiblity: 'hidden'
    },
    toolbar: theme.mixins.toolbar,
}));

export default function PokemonList(props) {
    const classes = useStyles();
    const [selected, setSelected] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const [pokemon, setPokemon] = useState(props.pokemon);
    const [filteredPokemon, setFilteredPokemon] = useState(props.pokemon);
    const [message, setMessage] = useState('');
    const [canTransfer, setCanTransfer] = useState(true);

    const filterList = (options) => {
        let pokemonToShow = [];
        if(options.showAll) {
            setFilteredPokemon(pokemon);
            return;
        }
        if(options.shiny) {
            pokemonToShow = pokemonToShow.concat(pokemon.filter(el => el.shiny));
        }
        if(options.favorite) {
            pokemonToShow = pokemonToShow.concat(pokemon.filter(el => el.favorite));
        }
        if(options.shadow) {
            pokemonToShow = pokemonToShow.concat(pokemon.filter(el => el.shadow));
        }
        if(options.zeroStar) {
            pokemonToShow = pokemonToShow.concat(pokemon.filter(el => el.totaliv <= 48.9));
        }
        if(options.oneStar) {
            pokemonToShow = pokemonToShow.concat(pokemon.filter(el => el.totaliv > 48.9 && el.totaliv <= 64.4));
        }
        if(options.twoStar) {
            pokemonToShow = pokemonToShow.concat(pokemon.filter(el => el.totaliv > 64.4 && el.totaliv <= 80));
        }
        if(options.threeStar) {
            pokemonToShow = pokemonToShow.concat(pokemon.filter(el => el.totaliv > 80 && el.totaliv <= 97.8));
        }
        if(options.fourStar) {
            pokemonToShow = pokemonToShow.concat(pokemon.filter(el => el.totaliv == 100));
        }
        if(options.name != '') {
            pokemonToShow = pokemonToShow.concat(pokemon.filter(el => el.name.toLowerCase().startsWith(options.name)));
        }
        setFilteredPokemon(pokemonToShow);
        //console.log('OPTIONS', options);
    }

    function onAdd(pokemonId) {
        let copy = selected.slice(0);
        if (copy.includes(pokemonId)) {
            copy = copy.filter(el => el != pokemonId);
        }
        else {
            copy.push(pokemonId);
        }
        setSelected(copy);

        let flag = true;
        for (var i = 0; i < copy.length; i++) {
            let p = pokemon.find(el => el.pokemonId == copy[i]);
            if (p.favorite) {
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
        <>
            <PokemonSearch filterList={filterList}/>
            <Grid container>
                {filteredPokemon.map(function(el, index) {
                    return (
                        <Grid item xs={4} sm={3} lg={2} key={index} className={el.show ? '' : 'hide'}>
                            <PokemonCard pokemon={el} onAdd={onAdd} key={el.pokemonId} active={selected.includes(el.pokemonId)} />
                        </Grid>
                    )
                })}
            </Grid>
            <Snackbar
                className={classes.snackbarMargin}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={showSuccess}
                autoHideDuration={6000}
                onClose={handleClose}
                message={message}
            />
            {
                selected.length ?
                    <BottomNavigation
                        className={classes.stickyFooter}
                        onChange={(event, newValue) => {
                            if (newValue == 1) { //favorite
                                axios.post('/api/website/favoriteMultiple', { selected: selected }).then(function (response) {
                                    if (response.status == 200) {
                                        setMessage(response.data.changed + ' Pokemon favorited!');
                                        setShowSuccess(true);
                                        let copy = [...filteredPokemon];
                                        for (var i = 0; i < copy.length; i++) {
                                            if (selected.includes(copy[i].pokemonId)) {
                                                copy[i].favorite = !copy[i].favorite;
                                            }
                                        }
                                        setFilteredPokemon(copy);
                                        setSelected([]);
                                    }
                                });
                            }
                            else if (newValue == 0) { //transfer
                                axios.post('/api/website/transferMultiple', { selected: selected }).then(function (response) {
                                    if (response.status == 200) {
                                        setMessage(response.data.changed + ' Pokemon transfered!');
                                        setShowSuccess(true);
                                        setFilteredPokemon(filteredPokemon.filter(el => !selected.includes(el.pokemonId)));
                                        setSelected([]);
                                    }
                                });
                            }
                        }}
                        showLabels
                    >
                        {canTransfer ?
                            <BottomNavigationAction label="Transfer" icon={
                                <Badge badgeContent={selected.length} color='error'>
                                    <DeleteIcon className={classes.icon} />
                                </Badge>} />
                            : null}
                        <BottomNavigationAction label="Favorite" icon={
                            <Badge badgeContent={selected.length} color='error'>
                                <FavoriteIcon className={classes.icon} />
                            </Badge>
                        } />
                    </BottomNavigation>
                    : null
            }
        </>
    );
}