import Head from 'next/head'
import '@fontsource/roboto'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    center: {
        textAlign: 'center',
    },
    content: theme.content,
    toolbar: theme.mixins.toolbar,
}));

export default function Home(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Head>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '100vh' }}
                >

                    <Grid item xs={12}>
                        <Typography paragraph variant='h3'>
                            Welcome to Poke GO!
                        </Typography>
                    </Grid>
                </Grid>
            </main>
        </div>
    );
}