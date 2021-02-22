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

export default function PrefixHelpPage(props) {
    const classes = useStyles();
	return (
		<div className={classes.root}>
            <div className={classes.toolbar} />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Typography variant='h2' className={classes.center}>
                    Prefix
                </Typography>
                <Typography paragraph>
                    Usage: !prefix (prefix)
                </Typography>
                <Typography paragraph>
                    Changes the bots prefix in a server. This requires the manage guild permission. Prefixes can be a maximum of 3
                    characters long. Should you ever forget the bots prefix you can mention the bot to learn what it is.
                </Typography>
            </main>
		</div>
	);
}