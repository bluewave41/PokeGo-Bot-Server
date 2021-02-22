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

export default function MedalHelpPage(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.toolbar} />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Typography variant='h2' className={classes.center}>
                    Medals
                </Typography>
                <Typography paragraph>
                    Displays a list of your current progress towards each medal.
                </Typography>
                <Typography paragraph>
                    Medals give an increase to your catch chance for Pokemon of the top coresponding to the medal.
                </Typography>
                <Typography paragraph>
                <ul>
                    <li>Bronze: 1.1x</li>
                    <li>Silver: 1.2</li>
                    <li>Gold: 1.3x</li>
                    <li>Platinum: 1.4x</li>
                </ul>
                </Typography>
                <Typography paragraph>
                    For Pokemon with multiple types the multiplier becomes the average of both.
                </Typography>
            </main>
        </div>
    );
}