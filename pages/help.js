import '@fontsource/roboto'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    accordion: {
        backgroundColor: 'gray',
        borderRadius: '5px',
        marginBottom: '0px',
        marginTop: '0px',
    },
    expanded: {
        marginBottom: '0px'
    },
    content: theme.content,
    toolbar: theme.mixins.toolbar,
}));

export default function Help(props) {
    const classes = useStyles();

    const helpCards = [
        { title: 'Favorite', description: 'Favorites one your Pokemon.' },
        { title: 'Display', description: 'Displays information about one of your Pokemon.' },
        { title: 'List', description: 'Shows a list of all your Pokemon.' },
        { title: 'Starter', description: 'Allows you to choose a starting Pokemon.' },
        { title: 'Inventory', description: 'Shows you all the items you have.' },
        { title: 'Nickname', description: 'Lets you choose a nickname for a Pokemon.' },
        { title: 'Daily', description: 'Gives you rewards to using the bot each day.' },
        { title: 'Evolve', description: 'Evolves a Pokemon to its next stage.' },
        { title: 'Info', description: 'Shows you various information about your bot progress.' },
        { title: 'Mail', description: "Shows you all the mail you've received." },
        { title: 'Medal', description: 'Shows you your progress towards each medal.' },
        { title: 'News', description: 'Shows you a list of news articles about the bot.' },
        { title: 'Pokedex', description: 'Shows you your progress towards completing the Pokedex.' },
        { title: 'Redeem', description: 'Allows you redeem a code to obtain items.' },
        { title: 'Teams', description: 'Allows you to create and manage your battle teams.' },
        { title: 'Search', description: 'Shows you a list of Pokemon and Pokestops in the area.' },
        { title: 'Powerup', description: 'Allows you to level a Pokemon.' },
        { title: 'Team', description: 'Allows you to join a team.' },
        { title: 'Travel', description: 'Allows you to travel to a new location.' }
    ]

    return (
        <div className={classes.root}>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {helpCards.map((element, index) => (
                    <Accordion classes={{
                        root: classes.accordion
                    }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${index + 1}a-content`}
                            id={`panel${index + 1}a-header`}
                        >
                            <Typography className={classes.heading}>{element.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                {element.description}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </main>
        </div>
    )
}