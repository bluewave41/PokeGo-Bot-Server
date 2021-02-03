import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import Link from 'next/link';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import clsx from 'clsx';

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
  const matches = useMediaQuery('(min-width:600px)');

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  if(!matches) {
    const list = (anchor) => (
        <div
          className={clsx(classes.list, {
            [classes.fullList]: anchor === 'top' || anchor === 'bottom',
          })}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {['favorite', 'display', 'list', 'starter', 'inventory', 'nickname', 'daily', 'evolve', 'info', 'mail', 'medal', 'news',
                  'pokedex', 'redeem', 'teams', 'search'].sort()
                    .map((text) => (
                        <ListItem button key={text}>
                            <Link className={classes.capitalize} href={`/help/${text}`}>{text.charAt(0).toUpperCase() + text.slice(1)}</Link>
                        </ListItem>
                    ))}
            </List>
        </div>
      );
    return (
        <div>
            {['left'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <SwipeableDrawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        onOpen={toggleDrawer(anchor, true)}
                    >
                    {list(anchor)}
                    </SwipeableDrawer>
                </React.Fragment>
        ))}
      </div>
    )
  }
  else {
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
                  'pokedex', 'redeem', 'teams', 'search'].sort()
                    .map((text) => (
                        <ListItem button key={text}>
                            <Link className={classes.capitalize} href={`/help/${text}`}>{text.charAt(0).toUpperCase() + text.slice(1)}</Link>
                        </ListItem>
                    ))}
            </List>
          </Drawer>
        </div>
      );
  }
}