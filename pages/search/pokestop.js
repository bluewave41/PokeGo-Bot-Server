import Head from 'next/head'
import '@fontsource/roboto'
import { applySession } from 'next-session';
import DesktopHelpDrawer from '../../components/DesktopHelpDrawer';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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

export default function SearchPokestopHelpPage(props) {
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
                <h1 className={classes.center}>Pokestop</h1>
                <Typography paragraph>
                    Pokestops provide you with valuable items. The items you get from a Pokestop are dependent on your level.
                </Typography>
                <ul>
                    <li>Level 5: Potions + Revives</li>
                    <li>Level 8: Razz Berries</li>
                    <li>Level 10: Super Potions</li>
                    <li>Level 12: Great Balls</li>
                    <li>Level 14: Nanab Berries</li>
                    <li>Level 15: Hyper Potions</li>
                    <li>Level 18: Pinap Berries</li>
                    <li>Level 20: Ultra Balls</li>
                    <li>Level 25: Max Potions</li>
                    <li>Level 30: Max Revives</li>
                </ul>
                <Typography paragraph>
                    Once you spin a Pokestop you'll be unable to spin it again for 5 minutes.
                </Typography>
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