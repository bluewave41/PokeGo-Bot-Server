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

export default function CreateTeamHelpPage(props) {
    const classes = useStyles();
	return (
		<div className={classes.root}>
            <div className={classes.toolbar} />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Typography variant='h2' className={classes.center}>
                    Create Team
                </Typography>
                <Typography paragraph>
                    You can create a team from the teams menu with create (team name). Creating a team will immediately open the     
                    <span> </span><span className={classes.link}><Link href='/help/teams/slot'>select slot</Link></span> menu.
                </Typography>
                <Typography paragraph>
                    You cannot have 2 teams with the same names and names are limited to 20 characters maximum.
                     You can have a maximum of 20 teams total.
                </Typography>
                <Typography paragraph>
                    You can quit this menu at any time with the quit command.
                </Typography>
            </main>
		</div>
	);
}