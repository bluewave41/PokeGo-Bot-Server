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

export default function NewsHelpPage(props) {
    const classes = useStyles();
	return (
		<div className={classes.root}>
            <div className={classes.toolbar} />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <h1 className={classes.center}>News</h1>
                <p>Usage: !news</p>
                <p>Description: Displays a list of news articles.</p>
                <Typography paragraph>
                    News articles detail events and changes to bot behavior. You can read a news article by doing !news and then sending
                    the ID of the article you wish to read.
                </Typography>
                <Typography paragraph>
                    Should there ever be more than 25 news articles you can change pages with the arrow reactions. Clicking a reaction
                    will change to the next page.
                </Typography>
            </main>
		</div>
	);
}