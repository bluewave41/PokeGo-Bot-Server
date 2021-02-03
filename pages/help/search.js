import Head from 'next/head'
import '@fontsource/roboto'
import { applySession } from 'next-session';
import DesktopHelpDrawer from '../../components/DesktopHelpDrawer';
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
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
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
			<Head>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
			</Head>
            <DesktopHelpDrawer />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <h1 className={classes.center}>Search</h1>
                <p>Usage: !search</p>
                <p>Description: Displays a list of Pokemon, Pokestops and Team Rocket grunts in the area.</p>
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

export async function getServerSideProps({ req, res }) {
	await applySession(req, res);
	if(!req.session.user) {
		return {
			props: {}
		}
	}
	return {
		props: {
			avatar: `https://cdn.discordapp.com/avatars/${req.session.user.id}/${req.session.user.avatar}`,
			username: req.session.user.username
		}
	}
}