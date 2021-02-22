import '@fontsource/roboto'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    content: theme.content,
    center: {
        textAlign: 'center'
    },
    toolbar: theme.mixins.toolbar,
}));

export default function InfoHelpPage(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.toolbar} />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Typography variant='h2' className={classes.center}>
                    Info
                </Typography>
                <Typography paragraph>
                    Usage: !info
                </Typography>
                <Typography paragraph>
                    Displays information about yourself.
                </Typography>
                <Typography paragraph>
                    <ul>
                        <li>Pokemon count</li>
                        <li>Currency</li>
                        <li>Stardust</li>
                        <li>Location</li>
                        <li>Pokemon + Item storage</li>
                        <li>Player progress</li>
                        <li>Current status</li>
                    </ul>
                </Typography>
            </main>
        </div>
    );
}