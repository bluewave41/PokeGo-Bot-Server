import Head from 'next/head'
import '@fontsource/roboto'
import { applySession } from 'next-session';
import DesktopHelpDrawer from '../components/DesktopHelpDrawer';
import { useMediaQuery } from '@material-ui/core';
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
        textAlign: 'center',
    },
    toolbar: theme.mixins.toolbar,
}));

export default function Help(props) {
    const matches = useMediaQuery('(min-width:600px)');
    const classes = useStyles();
    let elem = null;
    if(!matches) {
        elem = <Typography variant='h5'>
            You can view the command drawer by sliding from the left.
        </Typography>
    }
	return (
		<div>
			<Head>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
			</Head>
            <div className={classes.toolbar} />
            <main className={classes.content}>
                {elem}
            </main>
            <DesktopHelpDrawer />
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