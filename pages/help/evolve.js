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

export default function EvolveHelpPage(props) {
    const classes = useStyles();
	return (
		<div className={classes.root}>
            <div className={classes.toolbar} />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <h1 className={classes.center}>Evolve</h1>
                <p>Usage: !evolve (pokemonId)</p>
                <p>Example: !evolve 97</p>
                <p>Description: Allows you to evolve a Pokemon. You must have enough candy for the Pokemon you're trying to evolve for this
                    to be successful.
                </p>
            </main>
		</div>
	);
}