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

export default function DailyHelpPage(props) {
    const classes = useStyles();
	return (
		<div className={classes.root}>
            <div className={classes.toolbar} />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Typography variant='h2' className={classes.center}>
                    Daily
                </Typography>
                <Typography paragraph>
                    Usage: !daily
                </Typography>
                <Typography paragraph>
                    Can only be used one every 24 hours.
                </Typography>
                <Typography paragraph>
                    Awards coins and a travel ticket upon use.
                </Typography>
            </main>
		</div>
	);
}