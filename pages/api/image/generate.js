const sharp = require('sharp');
const TextToSVG = require('text-to-svg');
const textToSVG = TextToSVG.loadSync();
const fs = require('fs').promises;

const attributes = { stroke: 'black'};
const options = { x: 0, y: 0, fontSize: 36, anchor: 'top', attributes: attributes };

/*const charge = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="200" height="200">
<linearGradient id="lg" x1="0.5" y1="1" x2="0.5" y2="0">
    <stop offset="0%" stop-opacity="1" stop-color="royalblue"/>
    <stop offset="40%" stop-opacity="1" stop-color="royalblue"/>
    <stop offset="40%" stop-opacity="0" stop-color="royalblue"/>
    <stop offset="100%" stop-opacity="0" stop-color="royalblue"/>
</linearGradient>
<circle cx="50" cy="50" r="45" fill="url(#lg)" stroke="crimson" stroke-width="5"/>
</svg>`;*/

export default async function handler(req, res) {
	const p1 = req.body.p1;
	const p2 = req.body.p2;
	const p1Shields = req.body.p1Shields;
	const p2Shields = req.body.p2Shields;
		
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
		{ input: Buffer.from(p1Cp), top: p2Metrics.height+10, left: 0 },
		{ input: Buffer.from(p2Cp), top: p2Metrics.height+10, left: leftMargin }])
		
	if(p1Shields == 2) {
		await background.composite([
		    { input: shield, top: 0, left: p1Metrics.width+10 },
			{ input: shield, top: 0, left: p1Metrics.width+55 },
		]);
	}
	else if(p1Shields == 1) {
		await background.composite([
		    { input: shield, top: 0, left: p1Metrics.width+10 },
		]);
	}
	if(p2Shields == 2) {
		await background.composite([
		    { input: shield, top: 0, left: leftMargin-35-10 },
			{ input: shield, top: 0, left: leftMargin-35-55 },
		]);
	}
	else if(p2Shields == 1) {
		await background.composite([
		    { input: shield, top: 0, left: leftMargin-35-10 },
		]);
	}
	
	await background.toFile(`public/battle/${req.body.userId}.png`);
		
	res.end();
}

function getHealth(currentHP, maxHP) {
	const remaining = Math.floor(currentHP/maxHP*100);
	return `
		<svg xmlns="http://www.w3.org/2000/svg">
			<defs>
				<linearGradient id="MyGradient" x2="100%" y2="0%">
					<stop offset="${remaining}%" stop-color="green" />
					<stop offset="${100-remaining}%" stop-color="black" />
				</linearGradient>
			</defs>

			<rect fill="url(#MyGradient)" stroke="black" stroke-width="1"  
				x="0" y="0" width="150" height="10"/>
	</svg>`;
}
