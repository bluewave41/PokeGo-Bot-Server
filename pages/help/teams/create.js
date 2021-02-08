import Head from 'next/head'
import '@fontsource/roboto'
import { applySession } from 'next-session';
import DesktopHelpDrawer from '../../../components/DesktopHelpDrawer';
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

export default function CreateTeamHelpPage(props) {
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
                <h1 className={classes.center}>Creating a Team</h1>
                <Typography paragraph>
                    You can create a team from the teams menu with "create (team name)." Creating a team will immediately open the     
                    <span> </span><span className={classes.link}><Link href='/help/teams/slot'>select slot</Link></span> menu.
                </Typography>
                <Typography paragraph>
                    You cannot have 2 teams with the same names and names are limited to 20 characters maximum.
                     You can have a maximum of 20 teams total.
                </Typography>
                <Typography paragraph>
                    You can quit this menu at any time with the quit command.
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