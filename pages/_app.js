import React from 'react';
import '../styles/globals.css';
import NavBar from '../components/NavBar';

function MyApp({ Component, pageProps }) {
	React.useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector('#jss-server-side');
		if(jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);
	return (
            <>
				<NavBar username={pageProps.username} avatar={pageProps.avatar}/>
				<Component {...pageProps} />
            </>
	);
}

export default MyApp