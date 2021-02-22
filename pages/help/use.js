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
                <Typography variant='h2' className={classes.center}>
                    Use
                </Typography>
                <Typography paragraph>
                    Usage: !use (item name) (pokemonID)
                </Typography>
                <Typography paragraph>
                    Uses an item in your inventory. You must have at least one of the item you'd like to use and you must be in
                    the appropriate menu to do so. You cannot use Poke balls outside of an encounter and you cannot heal during a battle
                    as examples.
                </Typography>
            </main>
		</div>
	);
}