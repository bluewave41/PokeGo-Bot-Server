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

export default function NicknameHelpPage(props) {
    const classes = useStyles();
	return (
		<div className={classes.root}>
            <div className={classes.toolbar} />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Typography variant='h2' className={classes.center}>
                    Nickname
                </Typography>
                <Typography paragraph>
                    Usage: !nickname (pokemonId (name))
                </Typography>
                <Typography paragraph>
                    Aliases: nickname, nick
                </Typography>
                <Typography paragraph>
                    Changes a Pokemon's name to a nickname. Nicknames are limited to 12 characters and can only contain A-Z and 0-9.
                    No special symbols.
                </Typography>
            </main>
		</div>
	);
}