const sharp = require('sharp');
const TextToSVG = require('text-to-svg');
const textToSVG = TextToSVG.loadSync();
const fs = require('fs').promises;

const attributes = { stroke: 'black'};
const options = { x: 0, y: 0, fontSize: 36, anchor: 'top', attributes: attributes };

export default async function handler(req, res) {
	const p1 = req.body.p1;
	const p2 = req.body.p2;
	const p1Shields = req.body.p1Shields;
	const p2Shields = req.body.p2Shields;
	
	console.log(p1, p2);
		
	const p1Name = textToSVG.getSVG(p1.name, options);
	const p1Metrics = textToSVG.getMetrics(p1.name, options);
	const p1Cp = textToSVG.getSVG('CP: ' + p1.cp, options);

	const p2Name = textToSVG.getSVG(p2.name, options);
    const p2Metrics = textToSVG.getMetrics(p2.name, options);
	const p2Cp = textToSVG.getSVG('CP: ' + p2.cp, options);
	
	const p1HealthPercentage = Math.floor(p1.hp/p1.maxHP)*100;
	
    const background = sharp('public/battle/background.png');
    const shield = await sharp('public/battle/shield.png')
        .resize({ width: 35, height: p1Metrics.height })
        .toBuffer();

    let leftPokemon = await sharp(p1.path)
        .flop();
		
	const leftMetadata = await leftPokemon.metadata();
	
    leftPokemon = await leftPokemon.toBuffer();
		
    let rightPokemon = await sharp(p2.path);
	
	const rightMetadata = await rightPokemon.metadata();
        
	rightPokemon = await rightPokemon.toBuffer();

    const metadata = await background.metadata();
    const leftMargin = metadata.width-p2Metrics.width;
	
	let composite = [
        { input: leftPokemon, top: metadata.height-leftMetadata.height-100, left: 100 },
        { input: rightPokemon, top: metadata.height-rightMetadata.height-100, left: metadata.width-rightMetadata.width-100 }, //account for shadow
        { input: Buffer.from(p1Name), top: 0, left: 0 },
        { input: Buffer.from(p2Name), top: 0, left: leftMargin },
		{ input: Buffer.from(p1Cp), top: p2Metrics.height+10, left: 0 },
		{ input: Buffer.from(p2Cp), top: p2Metrics.height+10, left: leftMargin }];
		
	if(p1Shields == 2) {
		composite.push({ input: shield, top: 0, left: p1Metrics.width+10 });
		composite.push({ input: shield, top: 0, left: p1Metrics.width+55 });
	}
	else if(p1Shields == 1) {
		composite.push({ input: shield, top: 0, left: p1Metrics.width+10 });	
	}
	if(p2Shields == 2) {
		composite.push({ input: shield, top: 0, left: leftMargin-35-10 });
		composite.push({ input: shield, top: 0, left: leftMargin-35-55 });
	}
	else if(p2Shields == 1) {
		composite.push({ input: shield, top: 0, left: leftMargin-35-10 });
	}

    await background.composite(composite)
		.toFile(`public/battle/${req.body.userId}.png`);
		
	console.log('wrote');
		
	res.end();
}