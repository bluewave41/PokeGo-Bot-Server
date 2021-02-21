import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import LoginIcon from '~/icons/LoginIcon';
import LogoutIcon from '~/icons/LogoutIcon';
import InboxIcon from '@material-ui/icons/Inbox';
import HelpIcon from '@material-ui/icons/Help';
import Link from 'next/link';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    logo: {
        width: '40px',
        height: '40px',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: theme.drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.drawerWidth,
            zIndex: theme.zIndex.drawer + 1,
        },
        backgroundColor: '#55DDE0'
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: theme.drawerWidth,
        backgroundColor: '#33658A'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

function ResponsiveDrawer(props) {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const tabs = [
        { text: 'Home', icon: <HomeIcon />, href: '/', show: () => { return true }, },
        { text: 'Pokemon', icon: <InboxIcon />, href: '/pokemon', show: () => { return props.user.avatar } },
        { text: 'Login', icon: <LoginIcon />, href: process.env.NEXT_PUBLIC_oauthUrl, show: () => { return !props.user.avatar } },
    ];

    const helpFields = ['Favorite', 'Display', 'List', 'Starter', 'Inventory', 'Nickname', 'Daily', 'Evolve', 'Info', 'Mail', 'Medal',
        'News', 'Pokedex', 'Redeem', 'Teams', 'Search', 'Powerup', 'Team', 'Travel'].sort();

    const handleDrawerToggle = (event) => {
        if(!event.target.classList.contains('collapse') && !event.target.parentElement.classList.contains('collapse')) {
            setMobileOpen(!mobileOpen);
        }
    };

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <List>
                {tabs.map(el => {
                    if (el.show()) {
                        return (
                            <Link href={el.href}>
                                <ListItem button key={el.text}>
                                    <ListItemIcon>{el.icon}</ListItemIcon>
                                    <ListItemText primary={el.text} />
                                </ListItem>
                            </Link>
                        )
                    }
                })}
                {props.user.avatar ?
                    <a href='/api/auth/logout'>
                        <ListItem button key='logout'>
                            <ListItemIcon><LogoutIcon /></ListItemIcon>
                            <ListItemText primary='Logout' />
                        </ListItem>
                    </a>
                    : null}
                <Link href='/help/quickstart'>
                    <ListItem button key='quickstart'>
                        <ListItemIcon><PlayCircleOutlineIcon /></ListItemIcon>
                        <ListItemText primary='Quickstart' />
                    </ListItem>
                </Link>
                <ListItem button onClick={handleClick} className="collapse">
                    <ListItemIcon>
                        <HelpIcon />
                    </ListItemIcon>
                    <ListItemText primary="Help" className="collapse" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    {helpFields.map(el => (
                        <Link href={`/help/${el.toLowerCase()}`}>
                            <List component="div" disablePadding>
                                <ListItem button className={classes.nested} dense>
                                    <ListItemText primary={el} />
                                </ListItem>
                            </List>
                        </Link>
                    ))}
                </Collapse>
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <img src='/avatar.png' className={classes.logo} />
                    <Typography variant="h6" noWrap>
                        Poke GO
                    </Typography>
                    <Avatar style={{ marginLeft: 'auto' }} src={props.user.avatar} />
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        onClick={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
        </div>
    );
}

export default ResponsiveDrawer;