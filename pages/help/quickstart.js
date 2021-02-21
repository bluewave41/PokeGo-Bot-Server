import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Starter from './quickstart/starter';
import Intro from './quickstart/intro';
import Display from './quickstart/display';
import List from './quickstart/list';
import Search from './quickstart/search';
import Catching from './quickstart/catching';
import End from './quickstart/end';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    stickyFooter: {
        width: '100%',
        position: 'fixed',
        bottom: 0,
        backgroundColor: '#52057b',
        "& > *": {
            color: 'white',
        },
        [theme.breakpoints.up('sm')]: {
            marginLeft: `${theme.drawerWidth}px`,
            width: `calc(100% - ${theme.drawerWidth}px)`,
        },
    },
    content: {
        ...theme.content,
        marginBottom: '75px',
    },
    toolbar: theme.mixins.toolbar,
    textContent: theme.textContent,
}));

export default function QuickstartPage(props) {
    const [page, setPage] = React.useState(0);
    const classes = useStyles();
    const pages = [
        <Intro />,
        <Starter />,
        <Display />,
        <List />,
        <Search />,
        <Catching />,
        <End />,
    ]

    return (
        <div className={classes.root}>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <div className={classes.textContent}>
                    {pages[page]}
                </div>
            </main>
            <BottomNavigation
                className={classes.stickyFooter}
                onChange={(event, newValue) => {
                    if(newValue == 0 && page > 0) {
                        setPage(page-1);
                    }
                    else if(newValue == 1 && page < pages.length-1) {
                        setPage(page+1);
                    }
                }}
                showLabels
            >
                <BottomNavigationAction label="Back" icon={<ChevronLeft />} />
                <BottomNavigationAction label="Next" icon={<ChevronRight />} />
            </BottomNavigation>
        </div>
    )
}
