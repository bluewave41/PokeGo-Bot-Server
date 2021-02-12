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

export default function SelectPokemonHelpPage(props) {
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
                <h1 className={classes.center}>Selecting a Pokemon</h1>
                <Typography paragraph>
                    You can select a Pokemon to add to the selected slot by typing in the Pokemon's ID number. You can change pages
                    using the arrow reactions.
                </Typography>
                <Typography paragraph>
                    Selecting a Pokemon will open the
                    <span> </span><span className={classes.link}><Link href='/help/teams/slot'>select slot</Link></span> menu.
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