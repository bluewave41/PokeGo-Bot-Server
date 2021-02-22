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

export default function SelectSlotHelpPage(props) {
    const classes = useStyles();
	return (
		<div className={classes.root}>
            <div className={classes.toolbar} />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Typography variant='h2' className={classes.center}>
                    Selecting a Slot
                </Typography>
                <Typography paragraph>
                    You can select a slot by typing in the slot number you would like to edit. Selecting a slot will open the
                    <span> </span><span className={classes.link}><Link href='/help/teams/pokemon'>select pokemon</Link></span> menu.
                </Typography>
            </main>
		</div>
	);
}