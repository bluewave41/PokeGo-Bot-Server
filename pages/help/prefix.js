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
                <h1 className={classes.center}>Prefix</h1>
                <p>Usage: !prefix (prefix)</p>
                <p>Example: !prefix p!</p>
                <p>Limit: 3 characters</p>
                <p>Requirements: Manage guild permissions</p>
                <p>Description: Changes the bots prefix in a server to the given prefix.</p>
            </main>
		</div>
	);
}