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

export default function ListHelpPage(props) {
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
                <h1 className={classes.center}>List</h1>
                <p>Usage: !list (page number) (options)</p>
                <p>Note: page number is optional and defaults to 1</p>
                <p>Description: Displays a list of 25 Pokemon. Pages can be selected with the optional page number parameter.</p>
                <Typography paragraph>
                    Below is a list of options you can sort by:
                </Typography>
                <ul>
                    <li>shadow</li>
                    <li>shiny</li>
                    <li>favorite/favourite</li>
                    <li>iv [&lt;, &gt;]x (iv&gt;50, iv&lt;50)</li>
                    <li>sort [&lt;, &gt;] [cp, iv, level, id, pokedex] (sort&gt;cp)</li>
                </ul>
                <Typography paragraph>
                    !list 5 shadow favorite sort&gt;cp (display only favorited shadow Pokemon from page 5 sorted by CP ascending order)
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