// server.js
const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev })
const handle = app.getRequestHandler();

const options = {
    cert: fs.readFileSync(process.env.sslDirectory + '/fullchain.pem'),
    key: fs.readFileSync(process.env.sslDirectory + '/privkey.pem'),
    ca: fs.readFileSync(process.env.sslDirectory + '/chain.pem')
};

app.prepare().then(() => {
	createServer(options, (req, res) => {
		// Be sure to pass `true` as the second argument to `url.parse`.
		// This tells it to parse the query portion of the URL.
		const parsedUrl = parse(req.url, true)
		const { pathname, query } = parsedUrl

		handle(req, res, parsedUrl)
	}).listen(80, (err) => {
		
    if (err) throw err
        console.log('> Ready on http://localhost:80');   
    })
})