import { applySession } from 'next-session';

export default async function handler(req, res) {
    console.log('here');
    await applySession(req, res);
    console.log(req.session);
    await req.session.destroy();

    req.session = {};

    res.setHeader('Cache-Control', 'no-store');
	res.writeHead(301, {Location: '/'});
	res.end();
}