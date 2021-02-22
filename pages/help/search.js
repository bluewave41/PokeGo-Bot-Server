import '@fontsource/roboto'
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    link: {
        color: 'blue',
        cursor: 'pointer',
        textDecoration: 'underline',
    },
    root: {
        display: 'flex'
    },
    content: theme.content,
    center: {
        textAlign: 'center'
    },
    toolbar: theme.mixins.toolbar,
}));

export default function SearchHelpPage(props) {
    const classes = useStyles();
	return (
		<div className={classes.root}>
            <div className={classes.toolbar} />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Typography variant='h2' className={classes.center}>
                    Search
                </Typography>
                <Typography paragraph>
                    Usage: !search
                </Typography>
                <Typography paragraph>
                    Displays a list of Pokemon, Pokestops, Gyms and Team Rocket grunts in the area.
                </Typography>
                <Typography paragraph>
                    Pokemon populate each square that contains land on the map. Pokemon rotate out every 30 minutes and exist for everyone.
                    If you find a rare Pokemon you can share the location with your friends or even withhold it for yourself.
                </Typography>
                <Typography paragraph>
                    To start an encounter type in the number corresponding to the encounter.
                </Typography>
                <Link href="/search/pokemon"><div className={classes.link}>Pokemon</div></Link>
                <Link href="/search/pokestop"><div className={classes.link}>Pokestop</div></Link>
                <Link href="/search/grunt"><div className={classes.link}>Grunt</div></Link>
            </main>
		</div>
	);
}