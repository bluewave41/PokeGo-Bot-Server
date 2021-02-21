import { useState } from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	appBar: {
        backgroundColor: '#52057b',
        zIndex: theme.zIndex.drawer+1,
    },
    logo: {
        width: '40px',
        height: '40px',
    },
    center: {
        textAlign: 'center',
    },
    toolbar: theme.mixins.toolbar,
}));


export default function NavBar(props) {
    console.log(props);
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

	let avatar = props.avatar || '';
	return (
		<AppBar className={classes.appBar}>
		<Toolbar>
            <img src='/avatar.png' onClick={handleClick} className={classes.logo} />
            <Typography variant="h5" component="h2" className={classes.center}>
				PokeGO
			</Typography>
            <Box display={{xs: 'none', sm: 'inherit'}}>
			    <Button color="inherit"><Link href="/">Home</Link></Button>
                <Button color="inherit"><Link href="/help">Help</Link></Button>
                { props.avatar ? null : <Button color="inherit"><a href={process.env.oauthUrl}>Login</a></Button> }
			    { props.avatar ? <Button color="inherit"><Link href='/pokemon'>Pokemon</Link></Button> : null }
			    { props.avatar ? <Button color="inherit">Logout</Button> : null }
            </Box>

			<Avatar style={{marginLeft: 'auto'}} src={avatar} />
			</Toolbar>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}><Link href='/'>Home</Link></MenuItem>
                <MenuItem onClick={handleClose}><Link href='/help'>Help</Link></MenuItem>
                { props.avatar ? null : <MenuItem onClick={handleClose}><a href={process.env.oauthUrl}>Login</a></MenuItem>}
                { props.avatar ? <MenuItem onClick={handleClose}><Link href='/pokemon'>Pokemon</Link></MenuItem> : null }
                { props.avatar ? <MenuItem onClick={handleClose}>Logout</MenuItem> : null}
            </Menu>
		</AppBar>
	);
}