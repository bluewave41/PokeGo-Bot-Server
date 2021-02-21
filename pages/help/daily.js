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

export default function DailyHelpPage(props) {
    const classes = useStyles();
	return (
		<div className={classes.root}>
            <div className={classes.toolbar} />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <h1 className={classes.center}>Daily</h1>
                <p>Usage: !daily</p>
                <p>Restrictions: once every 24 hours</p>
                <p>Description: Awards coins and a travel ticket upon use.</p>
            </main>
		</div>
	);
}