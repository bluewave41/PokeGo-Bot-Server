import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Link from 'next/link';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function SwipeableTemporaryDrawer() {
  const classes = useStyles();
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
              'pokedex', 'redeem', 'teams', 'search', 'powerup', 'team', 'travel'].sort()
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