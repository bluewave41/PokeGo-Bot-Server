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

export default function TransferHelpPage(props) {
    const classes = useStyles();
	return (
		<div className={classes.root}>
            <div className={classes.toolbar} />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Typography variant='h2' className={classes.center}>
                    Transfer
                </Typography>
                <Typography paragraph>
                    Usage: !transfer (pokemonId)
                </Typography>
                <Typography paragraph>
                    Allows you to transfer a Pokemon.
                </Typography>
                <Typography paragraph>
                    Transferring a Pokemon will bring up a menu requiring you to confirm the transfer. You can confirm a transfer with either
                    "yes", "y" or "confirm."
                </Typography>
                <Typography paragraph>
                    Transferring a Pokemon will remove the Pokemon and reward you with 1 candy for that Pokemon.
                </Typography>
            </main>
		</div>
	);
}