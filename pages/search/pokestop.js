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

export default function PokestopHelpPage(props) {
    const classes = useStyles();
	return (
		<div className={classes.root}>
            <div className={classes.toolbar} />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Typography variant='h2' className={classes.center}>
                    Pokestop
                </Typography>
                <Typography paragraph>
                    Pokestops provide you with valuable items. The items you get from a Pokestop are dependent on your level.
                </Typography>
                <ul>
                    <li>Level 1: Poke Balls</li>
                    <li>Level 8: Razz Berries</li>
                    <li>Level 12: Great Balls</li>
                    <li>Level 14: Nanab Berries</li>
                    <li>Level 18: Pinap Berries</li>
                    <li>Level 20: Ultra Balls</li>
                </ul>
                <Typography paragraph>
                    Once you spin a Pokestop you'll be unable to spin it again for 5 minutes.
                </Typography>
            </main>
		</div>
	);
}