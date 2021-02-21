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
                <h1 className={classes.center}>Team</h1>
                <p>Usage: !team</p>
                <p>Requirements: Cannot have already joined a team, level 5</p>
                <p>Description: Allows you to join a team.</p>
                <Typography paragraph>
                    You can only join one team. Once you've selected a team you'll be unable to change it.
                </Typography>
            </main>
		</div>
	);
}