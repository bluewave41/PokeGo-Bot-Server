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
                <Typography variant='h2' className={classes.center}>
                    Shop
                </Typography>
                <Typography paragraph>
                    Usage: !shop (action) (item name) (amount)
                </Typography>
                <Typography paragraph>
                    Examples:    
                </Typography>
                <ul>
                    <li>!shop buy poke</li>
                    <li>!shop buy poke 2</li>
                    <li>!shop sell poke</li>
                    <li>!shop sell poke 2</li>
                </ul> 
                <Typography paragraph>
                    As shown above you do not need to use the full name of the item. The name however needs to be unique to the item you
                    want. 
                </Typography>
            </main>
		</div>
	);
}