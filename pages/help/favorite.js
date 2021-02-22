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

export default function FavoriteHelpPage(props) {
    const classes = useStyles();
	return (
		<div className={classes.root}>
            <div className={classes.toolbar} />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Typography variant='h2' className={classes.center}>
                    Favorite
                </Typography>
                <Typography paragraph>
                    Usage: !favorite (pokemonId)
                </Typography>
                <Typography paragraph>
                    Aliases: favorite, favourite
                </Typography>
                <Typography paragraph>
                    Adds or removes a Pokemon from your favorites list. Favorited Pokemon cannot be transfered or traded.
                </Typography>
            </main>
		</div>
	);
}