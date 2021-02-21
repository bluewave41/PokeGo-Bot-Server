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

export default function QuitHelpPage(props) {
    const classes = useStyles();
	return (
		<div className={classes.root}>
            <div className={classes.toolbar} />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <h1 className={classes.center}>Quit</h1>
                <p>Usage: !quit</p>
                <p>Description: Allows you to quit a menu. If you're ever stuck, quit will allow you to exit whatever menu you are in.
                    You can check what menu you are in with the info command.
                </p>
            </main>
		</div>
	);
}