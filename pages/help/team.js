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

export default function TeamHelpPage(props) {
    const classes = useStyles();
	return (
		<div className={classes.root}>
            <div className={classes.toolbar} />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Typography variant='h2' className={classes.center}>
                    Team
                </Typography>
                <Typography paragraph>
                    Usage: !team
                </Typography>
                <Typography paragraph>
                    At level 5 you will receive mail stating you can now join a team. You can only join a team if you don't already
                    belong to a team. You'll be unable to change your team once you've selected one.
                </Typography>
            </main>
		</div>
	);
}