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
                <Typography variant='h2' className={classes.center}>
                    Inventory
                </Typography>
                <Typography paragraph>
                    Usage: !inventory
                </Typography>
                <Typography paragraph>
                    Aliases: inventory, inv
                </Typography>
                <Typography paragraph>
                    Shows all of the items in your inventory as well as the amount oyu currently have.
                </Typography>
            </main>
		</div>
	);
}