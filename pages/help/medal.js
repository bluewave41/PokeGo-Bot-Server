import Head from 'next/head'
import '@fontsource/roboto'
import { applySession } from 'next-session';
import DesktopHelpDrawer from '../../components/DesktopHelpDrawer';
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

export default function MedalHelpPage(props) {
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
                <h1 className={classes.center}>Medals</h1>
                <p>Usage: !medals</p>
                <p>Description: Displays a list of your current progress towards each medal.</p>
                <Typography paragraph>
                    Medals give in increase to your catch chance for Pokemon of the type coresponding to the medal.
                </Typography>
                <ul>
                    <li>Bronze: 1.1x</li>
                    <li>Silver: 1.2</li>
                    <li>Gold: 1.3x</li>
                    <li>Platinum: 1.4x</li>
                </ul>
                <Typography paragraph>
                    For Pokemon with multiple types the multiplier becomes the average of both.
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