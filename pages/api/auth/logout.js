import { applySession } from 'next-session';

export default async function handler(req, res) {
    await applySession(req, res);
    await req.session.destroy();

    req.session = {};

    res.setHeader('Cache-Control', 'no-store');
	res.writeHead(301, {Location: '/'});
	res.end();
}