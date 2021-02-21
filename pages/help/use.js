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

export default function UseHelpPage(props) {
    const classes = useStyles();
	return (
		<div className={classes.root}>
            <div className={classes.toolbar} />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <h1 className={classes.center}>Use</h1>
                <p>Usage: !use (item name) (pokemon ID)</p>
                <p>Example: !use travel</p>
                <p>Example: !use charge 97</p>
                <p>Description: Uses an item in your inventory. You must have at least one of the item you'd like to use and you must be in
                    the appropriate menu to do so. You cannot use poke balls outside of an encounter and you cannot heal during a battle as
                    examples.
                </p>
            </main>
		</div>
	);
}