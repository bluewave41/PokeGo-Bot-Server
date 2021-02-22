import '@fontsource/roboto'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

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
                <Typography variant='h2' className={classes.center}>
                    Display
                </Typography>
                <Typography paragraph>
                    Usage: !display (pokemonId)
                </Typography>
                <Typography paragraph>
                    Aliases: display, d
                </Typography>
                <Typography paragraph>
                    Displays various Pokemon attibutes. You can only display Pokemon that you own.
                </Typography>
            </main>
		</div>
	);
}