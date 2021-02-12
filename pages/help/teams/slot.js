import Head from 'next/head'
import '@fontsource/roboto'
import { applySession } from 'next-session';
import HelpDrawer from '../../../components/HelpDrawer';
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
        textDecoration: 'underline'
    },
    toolbar: theme.mixins.toolbar,
}));

export default function SelectSlotHelpPage(props) {
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
            <HelpDrawer />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <h1 className={classes.center}>Selecting a Slot</h1>
                <Typography paragraph>
                    You can select a slot by typing in the slot number you would like to edit. Selecting a slot will open the
                    <span> </span><span className={classes.link}><Link href='/help/teams/pokemon'>select pokemon</Link></span> menu.
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