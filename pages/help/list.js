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

export default function ListHelpPage(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.toolbar} />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Typography variant='h2' className={classes.center}>
                    List
                </Typography>
                <Typography paragraph>
                    Usage: !list (page number) (options)
                </Typography>
                <Typography paragraph>
                    Displays a list of 25 Pokemon. Pages can be selected with the optional page number parameter and the list can
                    be filtered with the optional options parameter.
                </Typography>
                <Typography paragraph>
                    Below is a list of options you can sort by:
                </Typography>
                <Typography paragraph>
                    <ul>
                        <li>shadow</li>
                        <li>shiny</li>
                        <li>favorite/favourite</li>
                        <li>iv [&lt;, &gt;]x (iv&gt;50, iv&lt;50)</li>
                        <li>sort [&lt;, &gt;] [cp, iv, level, id, pokedex] (sort&gt;cp)</li>
                    </ul>
                </Typography>
                <Typography paragraph>
                    !list 5 shadow favorite sort&gt;cp (display only favorited shadow Pokemon from page 5 sorted by CP ascending order)
                </Typography>
            </main>
        </div>
    );
}