// server.js
const { createServer : createHttpServer } = require('http');
const { createServer : createHttpsServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

console.log(process.env.NODE_ENV);

const httpsOptions = {
	key: fs.readFileSync(`${process.env.CERTIFICATES}/privkey.pem`),
    cert: fs.readFileSync(`${process.env.CERTIFICATES}/fullchain.pem`)
};

app.prepare().then(() => {
    createHttpServer((req, res) => {
        if(!req.secure) {
            res.writeHead(301, { 'Location': `https://${req.headers.host}${req.url}` });
            return res.end();
        }
    }).listen(80, (err) => {
        if (err) {
            throw err;
        }
        console.log('> Ready on http://localhost:80');
    });

    createHttpsServer(httpsOptions, (req, res) => {
        const parsedUrl = parse(req.url, true);
        const { pathname, query } = parsedUrl;
        handle(req, res, parsedUrl)
    }).listen(443, (err) => {
        if (err) {
            throw err;
        }
        console.log('> Ready on http://localhost:443');
    });
})