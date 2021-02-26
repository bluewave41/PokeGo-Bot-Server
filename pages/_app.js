import React from 'react';
import '../styles/globals.css';
import NavDrawer from '../components/NavDrawer';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
import CssBaseline from "@material-ui/core/CssBaseline";
import { applySession } from 'next-session';

const breakpoints = createBreakpoints({})

const theme = createMuiTheme({
    drawerWidth: 240,
    palette: {
        background: {
            default: '#000'
        },
        text: {
            primary: '#FFF'
        }
    },
    content: {
        [breakpoints.up('md')]: {
            paddingLeft: 250
        },
        flexGrow: 1,
        paddingLeft: 0
    },
    textContent: {
        [breakpoints.up('sm')]: {
            paddingLeft: 100
        },
    }
})

function MyApp({ Component, pageProps, user }) {
    const [userInfo, setUserInfo] = React.useState({});
    React.useEffect(() => {
        if(user.avatar) {
            setUserInfo(user);
        }
    });
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <NavDrawer user={userInfo} />
            <Component {...pageProps} />
        </ThemeProvider>
    );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
	const { req, res } = ctx;
    /*CLIENT*/
    if(typeof window !== 'undefined') {
        return {
            user: {
                avatar: null,
                username: null,
            }
        }
    }
    await applySession(req, res);

    if(!req.session.hasOwnProperty('user')) {
        return {
            user: {
                avatar: null,
                username: null,
            }
        }
    }
    
    let pageProps = {}
    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
    }
    return {
        user: {
            avatar: `https://cdn.discordapp.com/avatars/${ctx.req.session.user.id}/${ctx.req.session.user.avatar}`,
            username: req.session.user.username,
            initial: true,
        },
        pageProps
    }
}

export default MyApp