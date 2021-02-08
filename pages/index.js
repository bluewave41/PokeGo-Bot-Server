import Head from 'next/head'
import '@fontsource/roboto'
import { applySession } from 'next-session';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    center: {
        textAlign: 'center',
    },
    toolbar: theme.mixins.toolbar,
}));

export default function Home(props) {
    const classes = useStyles();
	return (
		<div>
			<Head>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
			</Head>
            <div className={classes.toolbar} />
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '70vh' }}
            >
                <Grid item xs={12}>
                    <Typography variant='h3' className={classes.center}>
                        Welcome to the PokeGO dashboard.
                    </Typography>
                    <Typography variant='h5' className={classes.center}>
                        You can browse the site with either the tabs at the top or the menu bar by clicking the icon in the top left.
                    </Typography>
                </Grid>   
            </Grid> 
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