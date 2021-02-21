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

export default function MailHelpPage(props) {
    const classes = useStyles();
	return (
		<div className={classes.root}>
            <div className={classes.toolbar} />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <h1 className={classes.center}>Mail</h1>
                <p>Usage: !mail</p>
                <p>Description: Opens the mail menu allowing you to manage your mail.</p>
                <Typography paragraph>
                    Mail will be received when you level up. Mail will contain your rewards for reaching a new level and at
                    level 5 you will receive a message informing you that you can now join a team.
                </Typography>
                <Typography paragraph>
                    If you have more than 25 messages you can swap between pages with the arrow reactions. Clicking a reaction
                    will change pages.
                </Typography>
                <Typography paragraph>
                    To read the contents of a message simply input the mail ID while browsing the menu. While viewing a message you
                    can claim any rewards by sending "claim"
                </Typography>
                <Typography paragraph>
                    Mail with a bell indicates the message has not yet been read. An exclamation point indicates that the mail
                    has unclaimed rewards.
                </Typography>
            </main>
		</div>
	);
}