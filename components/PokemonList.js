import { useState } from 'react';
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
            marginLeft: `${theme.drawerWidth}px`,
            width: `calc(100% - ${theme.drawerWidth}px)`,
        },
    },
    snackbarMargin: {
        [theme.breakpoints.up('md')]: {
            marginLeft: `${theme.drawerWidth/2}px`,
        },
    },
    icon: {
        color: '#FFF',
    },
    content: {
        ...theme.content,
        paddingBottom: '75px',
    },
    toolbar: theme.mixins.toolbar,
}));

export default function PokemonList(props) {
    const classes = useStyles();
    const [selected, setSelected] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const [pokemon, setPokemon] = useState(props.pokemon);
    const [message, setMessage] = useState('');
    const [canTransfer, setCanTransfer] = useState(true);

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
        <div className={classes.root}>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Grid container>
                    {pokemon.map(function(el) {
                        return (
                            <Grid item xs={4} sm={3} lg={2}>
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
            </main>
            {selected.length ?
                <BottomNavigation
                    className={classes.stickyFooter}
                    onChange={(event, newValue) => {
                        if (newValue == 1) { //favorite
                            axios.post('/api/website/favoriteMultiple', { selected: selected }).then(function (response) {
                                if (response.status == 200) {
                                    setMessage(response.data.changed + ' Pokemon favorited!');
                                    setShowSuccess(true);
                                    let copy = [...pokemon];
                                    for (var i = 0; i < copy.length; i++) {
                                        if (selected.includes(copy[i].pokemonId)) {
                                            copy[i].favorite = !copy[i].favorite;
                                        }
                                    }
                                    setPokemon(copy);
                                    setSelected([]);
                                }
                            });
                        }
                        else if (newValue == 0) { //transfer
                            axios.post('/api/website/transferMultiple', { selected: selected }).then(function (response) {
                                if (response.status == 200) {
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
        </div>
    );
}