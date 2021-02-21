import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        marginTop: '10px',
        marginBottom: '5px',
        backgroundColor: 'navy',
        justifyContent: 'space-between',
        flexDirection: 'column',
        width: '100%'
    },
    center: {
        textAlign: 'center',
    },
    content: theme.content,
    toolbar: theme.mixins.toolbar,
}));

export default function HelpCard(props) {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant='h6' className={classes.center}>
                    {props.title}
                </Typography>
                <Typography>
                    {props.description}
                </Typography>
            </CardContent>
        </Card>
    );
}