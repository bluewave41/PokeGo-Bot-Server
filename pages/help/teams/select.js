import '@fontsource/roboto'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    link: {
        color: 'blue',
        textDecoration: 'underline',
    },
    content: theme.content,
    center: {
        textAlign: 'center'
    },
    toolbar: theme.mixins.toolbar,
}));

export default function SelectTeamHelpPage(props) {
    const classes = useStyles();
	return (
		<div className={classes.root}>
            <div className={classes.toolbar} />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Typography variant='h2' className={classes.center}>
                    Selecting a Team
                </Typography>
                <Typography paragraph>
                    You can select a team from the teams menu with select (team name). Selecting a team will immediately open the
                    <span> </span><span className={classes.link}><Link href='/help/teams/slot'>select slot</Link></span> menu.
                </Typography>
                <Typography paragraph>
                    You can quit this menu at any time with the quit command.
                </Typography>
            </main>
		</div>
	);
}