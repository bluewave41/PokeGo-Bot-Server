const path = require('path');
const webpack = require('webpack');

module.exports = {
	env: {
		url: 'http://localhost:3000',
		sprites: 'http://bluewave41.xyz:5000',
        oauthUrl: 'https://discord.com/api/oauth2/authorize?client_id=721674409659858965&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauthorize&response_type=code&scope=identify',
        authorizeUrl: 'http://localhost:3000/api/authorize',
    },
	webpack: config => {
		config.resolve.alias['~'] = path.resolve(__dirname);
		return config;
	}
}