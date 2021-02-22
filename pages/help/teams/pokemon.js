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

export default function SelectPokemonHelpPage(props) {
    const classes = useStyles();
	return (
		<div className={classes.root}>
            <div className={classes.toolbar} />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Typography variant='h2' className={classes.center}>
                    Selecting a Pokemon
                </Typography>
                <Typography paragraph>
                    You can select a Pokemon to add to the selected slot by typing in the Pokemon's ID number. You can change pages
                    using the arrow reactions.
                </Typography>
                <Typography paragraph>
                    Selecting a Pokemon will open the
                    <span> </span><span className={classes.link}><Link href='/help/teams/slot'>select slot</Link></span> menu.
                </Typography>
            </main>
		</div>
	);
}