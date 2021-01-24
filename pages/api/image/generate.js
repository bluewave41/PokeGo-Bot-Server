const sharp = require('sharp');
const TextToSVG = require('text-to-svg');
const textToSVG = TextToSVG.loadSync();
const fs = require('fs').promises;

const attributes = { stroke: 'black'};
const options = { x: 0, y: 0, fontSize: 36, anchor: 'top', attributes: attributes };

export default async function handler(req, res) {
	const p1 = req.body.p1;
	const p2 = req.body.p2;
		
	const p1Name = textToSVG.getSVG(p1.name, options);
	const p1Metrics = textToSVG.getMetrics(p1.name, options);
	
	const p2Name = textToSVG.getSVG(p2.name, options);
    const p2Metrics = textToSVG.getMetrics(p2.name, options);
	
    const background = sharp('public/battle/background.png');
    const shield = await sharp('public/battle/shield.png')
        .resize({ width: 35, height: p1Metrics.height })
        .toBuffer();
		    
    const leftPokemon = await sharp(p1.path)
        .flop()
        .toBuffer();

    const rightPokemon = await sharp(p2.path)
        .toBuffer();

    const metadata = await background.metadata();
    const leftMargin = metadata.width-p2Metrics.width;

    await background.composite([
        { input: leftPokemon, top: 300, left: 100 },
        { input: rightPokemon, top: 300, left: leftMargin },
        { input: Buffer.from(p1Name), top: 0, left: 0 },
        { input: Buffer.from(p2Name), top: 0, left: leftMargin },
        { input: shield, top: 0, left: p1Metrics.width+10 },
        { input: shield, top: 0, left: p1Metrics.width+55 },
        { input: shield, top: 0, left: leftMargin-35-10 },
        { input: shield, top: 0, left: leftMargin-35-55 }])
        //{ input: Buffer.from(health), top: p2Metrics.height+10, left: 5 },
        //{ input: Buffer.from(health), top: p2Metrics.height+10, left: leftMargin }])
        .toFile(`public/battle/${req.body.userId}.png`);
		
	res.end();
}