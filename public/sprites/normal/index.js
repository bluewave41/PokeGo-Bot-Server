const fs = require('fs');
const request = require('request');

let files = fs.readdirSync('./');

start();

async function start() {
	for(var x=0;x<files.length;x++) {
		await request(`https://img.pokemondb.net/sprites/go/shiny/${files[x]}`).pipe(fs.createWriteStream(`../shiny/${files[x]}`));
	}
}