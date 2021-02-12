import Head from 'next/head'
import '@fontsource/roboto'
import { applySession } from 'next-session';
import HelpDrawer from '../../components/HelpDrawer';
import Typography from '@material-ui/core/Typography';
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

export default function TransferHelpPage(props) {
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
                <h1 className={classes.center}>Transfer</h1>
                <p>Usage: !transfer (pokemonId)</p>
                <p>Example: !transfer 97</p>
                <p>Description: Allows you to transfer a Pokemon.</p>
                <Typography paragraph>
                    Transferring a Pokemon will bring up a menu requiring you to confirm the transfer. You can confirm a transfer with either
                    "yes", "y" or "confirm."
                </Typography>
                <Typography paragraph>
                    Transferring a Pokemon will remove the Pokemon and reward you with 1 candy for that Pokemon.
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