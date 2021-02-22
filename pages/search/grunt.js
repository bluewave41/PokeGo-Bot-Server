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
                    Grunt
                </Typography>
                <Typography paragraph>
                    Grunts utilize shadow Pokemon for evil. Selecting a grunt will prompt you to select a team you've built to do battle.
                    To select a team simply input the name of the team you would like to use.
                </Typography>
                <Typography paragraph>
                    In the battle screen you will be able to see your HP, the grunt Pokemon's HP and your energy. The energy shown is
                    the amount you need to use your charge move. You can only have a maximum of 100 energy.
                </Typography>
                <Typography paragraph>
                    There are 3 valid commands you can use in a battle.
                </Typography>
                <ul>
                    <li>f</li>
                    <li>c</li>
                    <li>s</li>
                </ul>
                <Typography paragraph>
                    These commands stand for (f)ast, (c)harge and (s)witch. Fast will perform a fast move. Charge will perform a charge
                    move if you have the energy to do so. Switch will open the switch menu to allow you to switch out.
                </Typography>
                <Typography paragraph>
                    Each move has a delay associated with it. Bite for example has a delay of 500 and Gust is 2000. This means that 4
                    bites can be executed before the opponent has a chance to attack. You can only perform actions on your own turn.
                </Typography>
                <Typography paragraph>
                    Because of these delays, f can also be given a number of turns to simulate. f 5 for example will perform 5 turns.
                    These turns are cut short if the opponent uses a charge move or faints.
                </Typography>
                <Typography paragraph>
                    If you succeed in defeating a grunt you'll be given the opportunity to catch one of their shadow Pokemon! Shadow
                    Pokemon are unique as they deal 1.2x damage but only have 0.83x the defense.
                </Typography>
                <Typography paragraph>
                    You can quit a battle at any time with !quit.
                </Typography>
            </main>
		</div>
	);
}