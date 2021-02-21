import '@fontsource/roboto'
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

export default function DisplayHelpPage(props) {
    const classes = useStyles();
	return (
		<div className={classes.root}>
            <div className={classes.toolbar} />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <h1 className={classes.center}>Display</h1>
                <p>Usage: !display (pokemonId)</p>
                <p>Example: !display 97</p>
                <p>Aliases: display, d</p>
                <p>Description: Displays information about the selected Pokemon. You can only display Pokemon that you own.</p>
            </main>
		</div>
	);
}