const path = require('path');
const webpack = require('webpack');

module.exports = {
	env: {
		url: 'http://localhost:3000',
		sprites: 'http://bluewave41.xyz:5000',
	},
	webpack: config => {
		config.resolve.alias['~'] = path.resolve(__dirname);
		return config;
	}
}