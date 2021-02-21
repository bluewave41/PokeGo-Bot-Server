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

export default function PokedexHelpPage(props) {
    const classes = useStyles();
	return (
		<div className={classes.root}>
            <div className={classes.toolbar} />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <h1 className={classes.center}>Pokedex</h1>
                <p>Usage: !pokedex (page)</p>
                <p>Example: !pokedex</p>
                <p>Example: !pokedex 2</p>
                <p>Description: Displays the number of each Pokemon that you've seen and caught.</p>
            </main>
		</div>
	);
}