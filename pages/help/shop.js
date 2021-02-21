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

export default function ShopHelpPage(props) {
    const classes = useStyles();
	return (
		<div className={classes.root}>
            <div className={classes.toolbar} />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <h1 className={classes.center}>Shop</h1>
                <p>Usage: !shop (action) (item name) (amount)</p>
                <p>Possible actions are buy and sell. No action will show a list of items in the shop and their prices.</p>
                <p>Example: !shop buy poke</p>
                <p>Example: !shop buy poke 2</p>
                <p>Example: !shop sell poke</p>
                <p>Example: !shop sell poke 2</p>
                <p>Description: Allows you to interact with the shop.</p>
            </main>
		</div>
	);
}