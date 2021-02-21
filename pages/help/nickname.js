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

export default function NicknameHelpPage(props) {
    const classes = useStyles();
	return (
		<div className={classes.root}>
            <div className={classes.toolbar} />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <h1 className={classes.center}>Nickname</h1>
                <p>Usage: !nickname (pokemonId) (name)</p>
                <p>Example: !nickname 97 bob</p>
                <p>Aliases: nickname, nick</p>
                <p>Limit: 20 characters, alphanumeric characters only. A-Z and 0-9</p>
                <p>Description: Changes a Pokemon's name to a nickname.</p>
            </main>
		</div>
	);
}