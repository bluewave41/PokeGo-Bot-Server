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

export default function StarterHelpPage(props) {
    const classes = useStyles();
	return (
		<div className={classes.root}>
            <div className={classes.toolbar} />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Typography variant='h2' className={classes.center}>
                    Starter
                </Typography>
                <Typography paragraph>
                    Usage: !starter
                </Typography>
                <Typography paragraph>
                    Opens a menu allowing you to select a starter Pokemon.
                </Typography>
                <Typography paragraph>
                    To select a starter Pokemon simply type in the name of the Pokemon you would like.
                </Typography>
            </main>
		</div>
	);
}