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
    redBullet: {
        color: 'red',
        fontWeight: 'bold',
    },
    yellowBullet: {
        color: 'yellow',
        fontWeight: 'bold',
    },
    greenBullet: {
        color: 'green',
        fontWeight: 'bold',
    },
    blueBullet: {
        color: 'blue',
        fontWeight: 'bold',
    },
    purpleBullet: {
        color: 'purple',
        fontWeight: 'bold',
    },
    toolbar: theme.mixins.toolbar,
}));

export default function PowerupHelpPage(props) {
    const classes = useStyles();
	return (
		<div className={classes.root}>
            <div className={classes.toolbar} />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <h1 className={classes.center}>Powerup</h1>
                <p>Usage: !powerup (pokemonId)</p>
                <p>Example: !powerup 97</p>
                <p>Description: Allows you to powerup a Pokemon. This requires candy for the Pokemon you'd like to level up.</p>
                <Typography paragraph>
                    Doing !powerup (pokemonId) will open a menu displaying multiple pieces of information.
                </Typography>
                <img src="/help/powerup.png"/>
                <Typography paragraph>
                    <div><span className={classes.redBullet}>•</span><span> The current level of your Pokemon and the level it will reach on confirmation</span></div>
                    <div><span className={classes.yellowBullet}>•</span><span> The current CP of your Pokemon and the CP it will reach on confirmation</span></div>
                    <div><span className={classes.greenBullet}>•</span><span> The amount of candy this powerup will cost</span></div>
                    <div><span className={classes.blueBullet}>•</span><span> The minimum and maximum numbers of times you can power this Pokemon up</span></div>
                    <div><span className={classes.purpleBullet}>•</span><span> The amount of candy you currently have the the amount you'll have after confirmation</span></div>
                </Typography>

                <Typography paragraph>
                    Submitting a number will update this menu to reflect the changes. Typing "confirm" will finalize the action updating
                    your Pokemons level and taking the requires candy.
                </Typography>
            </main>
		</div>
	);
}