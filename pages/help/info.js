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

export default function InfoHelpPage(props) {
    const classes = useStyles();
	return (
		<div className={classes.root}>
            <div className={classes.toolbar} />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <h1 className={classes.center}>Info</h1>
                <p>Usage: !info</p>
                <p>Description: Displays information about yourself.</p>
                <ul>
                    <li>Pokemon count</li>
                    <li>Currency</li>
                    <li>Stardust</li>
                    <li>Location</li>
                    <li>Pokemon + Item storage</li>
                    <li>Player progress</li>
                    <li>Current status</li>
                </ul>
            </main>
		</div>
	);
}