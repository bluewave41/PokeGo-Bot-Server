import '@fontsource/roboto'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    content: theme.content,
    center: {
        textAlign: 'center'
    },
    toolbar: theme.mixins.toolbar,
}));

export default function FavoriteHelpPage(props) {
    const classes = useStyles();
	return (
		<div className={classes.root}>
            <div className={classes.toolbar} />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <h1 className={classes.center}>Favorite</h1>
                <p>Usage: !favorite (pokemonId)</p>
                <p>Example: !favorite 97</p>
                <p>Aliases: favorite, favourite</p>
                <p>Description: Adds a Pokemon to your favorites list or removes it if they were previously favorited. Favorited Pokemon cannot be transfered.</p>
            </main>
		</div>
	);
}