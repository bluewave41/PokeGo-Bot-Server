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

export default function TravelHelpPage(props) {
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
                <h1 className={classes.center}>Travel</h1>
                <p>Usage: !travel (location?)</p>
                <p>Description: Opens the map and allows you to select a new square to travel to. Moving a single square takes 5 minutes and
                    you'll be unable to search for Pokemon until you've reached your destination.
                </p>
                <Typography paragraph>
                    You can bypass the map if you already know where you want to travel with as an example !travel S6. You will still
                    have to wait but this allows you to perform a single command.
                </Typography>
                <Typography paragraph>
                    Travel ticket items will allow you to travel to any square you wish instantly. These can be received as daily
                    rewards.
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