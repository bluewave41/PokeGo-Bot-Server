const fs = require('fs').promises;

export default async function handler(req, res) {
    let map = await fs.readFile('public/numberedmap.png', 'base64');
    res.send(map);
    res.end();
}