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

export default function InventoryHelpPage(props) {
    const classes = useStyles();
	return (
		<div className={classes.root}>
            <div className={classes.toolbar} />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <h1 className={classes.center}>Inventory</h1>
                <p>Usage: !inventory</p>
                <p>Example: !inventory</p>
                <p>Aliases: inv, inventory</p>
                <p>Description: Shows all of the items in your inventory and the amount of each you have.</p>
            </main>
		</div>
	);
}