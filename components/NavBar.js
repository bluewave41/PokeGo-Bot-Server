import { useState } from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/ToolBar';
import Avatar from '@material-ui/core/Avatar';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
	root: {
		backgroundColor: '#52057b',
    },
    logo: {
        width: '40px',
        height: '40px',
    },
    center: {
        textAlign: 'center',
    }
});


export default function NavBar(props) {
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
		<AppBar position="static" className={classes.root}>
		<Toolbar>
            <img src='/avatar.png' onClick={handleClick} className={classes.logo} />
            <Typography variant="h5" component="h2" className={classes.center}>
				PokeGO
			</Typography>
            <Box display={{xs: 'none', sm: 'none', md: 'inherit'}}>
			    <Button color="inherit"><Link href="/">Home</Link></Button>
                { props.avatar ? null : <Button color="inherit"><a href='https://discord.com/api/oauth2/authorize?client_id=721674409659858965&redirect_uri=http%3A%2F%2F10.3.141.175%3A3000%2Fapi%2Fauthorize&response_type=code&scope=identify'>Login</a></Button> }
			    { props.avatar ? <Button color="inherit"><Link href='/pokemon'>Pokemon</Link></Button> : null }
			    <Button color="inherit">Logout</Button>
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
                { props.avatar ? null : <MenuItem onClick={handleClose}><a href='https://discord.com/api/oauth2/authorize?client_id=721674409659858965&redirect_uri=http%3A%2F%2F10.3.141.175%3A3000%2Fapi%2Fauthorize&response_type=code&scope=identify'>Login</a></MenuItem>}
                { props.avatar ? <MenuItem onClick={handleClose}><Link href='/pokemon'>Pokemon</Link></MenuItem> : null }
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
		</AppBar>
	);
}