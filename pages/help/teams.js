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
    link: {
        color: 'blue',
        textDecoration: 'underline',
    },
    toolbar: theme.mixins.toolbar,
}));

export default function TeamsHelpPage(props) {
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
                <h1 className={classes.center}>Teams</h1>
                <p>Usage: !teams</p>
                <p>Description: Allows you to manage your team lineups for Team Rocket battles.</p>
                <Typography paragraph>
                    !teams will open a menu displaying your current teams. From here you can do one of the following:
                </Typography>
                <div className={classes.link}><Link href='/help/teams/create'>create (team name)</Link></div>
                <div className={classes.link}><Link href='/help/teams/select'>select (team name)</Link></div>
                <div className={classes.link}><Link href='/help/teams/delete'>delete (team name)</Link></div>
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