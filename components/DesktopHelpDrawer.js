import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import Link from 'next/link';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    fullList: {
        width: 'auto',
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: '#52057b',
        color: 'white',
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}));

export default function PermanentDrawerLeft() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.toolbar} />
                <Divider />
                <List>
                    {['favorite', 'display', 'list', 'starter', 'inventory', 'nickname', 'daily', 'evolve', 'info', 'mail', 'medal', 'news',
                        'pokedex', 'redeem', 'teams', 'search', 'powerup', 'team', 'travel'].sort()
                        .map((text) => (
                            <Link href={`/help/${text}`}>
                                <ListItem button key={text}>
                                    {text.charAt(0).toUpperCase() + text.slice(1)}
                                </ListItem>
                            </Link>
                        ))}
                </List>
            </Drawer>
        </div>
    );
}