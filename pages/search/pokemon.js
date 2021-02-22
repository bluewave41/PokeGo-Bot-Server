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

export default function PokemonHelpPage(props) {
    const classes = useStyles();
	return (
		<div className={classes.root}>
            <div className={classes.toolbar} />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Typography variant='h2' className={classes.center}>
                    Pokemon
                </Typography>
                <Typography paragraph>
                    Catching a Pokemon requires you to throw a ball at a square being occupied by the Pokemon when you throw.
                </Typography>
                <Typography paragraph>
                    There are three different kinds of throws.
                </Typography>
                <ul>
                    <li>Left curve</li>
                    <li>Right curve</li>
                    <li>Straight</li>
                </ul>
                <Typography paragraph>
                    Throwing a left curve will hit the selected square and the square to the left. A right curve will hit the selected
                    square and the square to the right. Straight throws only hit a single square. This means the only valid throws are:
                </Typography>
                <ul>
                    <li>S1</li>
                    <li>S2</li>
                    <li>S3</li>
                    <li>L2</li>
                    <li>L3</li>
                    <li>R2</li>
                    <li>R1</li>
                </ul>
                <Typography paragraph>
                    Straight throws give the highest catch multiplier and curve throws give a higer multiplier if the square you select
                    is the square the Pokemon is on. If the Pokemon occupies square 2 and you throw L3 you will get less of a multiplier
                    than if you did L2 as the Pokemon is occupying square 2.
                </Typography>
                <Typography paragraph>
                    You can switch Pokeballs here assuming you have them by using !use (poke ball).
                </Typography>
                <Typography paragraph>
                    You can quit this screen with !quit.
                </Typography>
            </main>
		</div>
	);
}