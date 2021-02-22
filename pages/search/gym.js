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
                    Gym
                </Typography>
                <Typography paragraph>
                    Gyms provide you with healing items. The items you can get are dependent on your level.
                </Typography>
                <ul>
                    <li>Level 5: Potions + Revives</li>
                    <li>Level 10: Super Potions</li>
                    <li>Level 15: Hyper Potions</li>
                    <li>Level 25: Max Potions</li>
                    <li>Level 30: Max Revives</li>
                </ul>
                <Typography paragraph>
                    Once you spin a Gym you'll be unable to spin it again for 5 minutes.
                </Typography>
            </main>
		</div>
	);
}