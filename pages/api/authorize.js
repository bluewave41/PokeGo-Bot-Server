const DiscordOauth2 = require('discord-oauth2');
const oauth = new DiscordOauth2();
import { applySession } from 'next-session';
const User = require('~/knex/models/User');
import '~/lib/Database';

export default async function handler(req, res) {
    await applySession(req, res);
    let redirect = 'http://bluewave41.xyz:3000/api/authorize';
	let token = await oauth.tokenRequest({
		clientId: '721674409659858965',
		clientSecret: 'JHfpaK2YRTDkdcHNdO1yZNPiq0YjbuIk',
		code: req.query.code,
		scope: 'identify',
		grantType: 'authorization_code',
		redirectUri: redirect
	});
    let userInfo = await oauth.getUser(token.access_token);
	console.log(userInfo);
	const user = await User.query().select('userId', 'admin')
		.where('discordId', userInfo.id)
		.first();
    userInfo.userId = user.userId;
    userInfo.admin = user.admin;
	req.session.user = userInfo;
	await req.session.commit();
	res.writeHead(301, {Location: '/'});
	res.end();
}