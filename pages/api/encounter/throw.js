const PokemonCommands = require('~/lib/PokemonCommands');
import PlayerEncounters from '~/knex/models/PlayerEncounters';
import '~/lib/Database';
import Errors from '~/lib/Errors';
import InventoryCommands from '~/lib/InventoryCommands';
import PowerupTable from '~/lib/PowerupTable';
import UserCommands from '~/lib/UserCommands';
import Utils from '~/lib/Utils';

export default async function handler(req, res) {
    let userId, square;

    try {
        Utils.doParametersExist(['userId', 'square'], req.body, 'MISSING_PARAMETER');
        userId = req.body.userId;
        square = Utils.findElement(['L2', 'L3', 'R1', 'R2', 'S1', 'S2', 'S3'], req.body.square, null, 'INVALID_SQUARE');
    }
    catch(err) {
        res.json({error: Errors.getError(err, req.headers.errors)});
        return res.end();
    }

    const encounter = await PlayerEncounters.query().select('*')
        .where('userId', userId).first();

    if(!encounter) {
        res.json({error: Errors.getError(err, req.headers.errors)});
        return res.end();
    }

    //check that we have the type of pokeball that we're using
    const { amount: pokeballCount } = await InventoryCommands.getItemCount(userId, encounter.activePokeball);

    if(pokeballCount <= 0) {
        res.json({error: Errors.getError(err, req.headers.errors)});
        return res.end();
    }

    //check that the pokemon still exists

    let { pokemonPos } = encounter;

    //Determine whether or not the Pokemon moves
    pokemonPos = updatePokemonPosition(pokemonPos, encounter.canPokemonMove);

    let reply = {
        pokemon: encounter.infoForUser,
    }

    let hitObject = doesBallHit(square, pokemonPos);
    if(hitObject.hit) {
        if(tryToCatch(encounter.pokemon, hitObject.multiplier, encounter.multiplier)) {
            //add xp
            let xpGained = 100;
            switch(hitObject.multiplier) {
                case 1.5:
                    xpGained += 100;
                    break;
                case 2:
                    xpGained += 200;
                    break;
            }

            await UserCommands.addXP(userId, xpGained);
            await UserCommands.update(userId, [
                { rowName: 'nextCommand', value: null}
            ]);

            //add pokemon
            const pokemon = await PokemonCommands.catchPokemon(userId, encounter.pokemon, encounter.candyEarned);
            
            reply.flag = 'caught';
            reply.xpGained = xpGained;
            reply.catchDust = encounter.pokemon.catchDust;
            reply.catchCandy = encounter.candyEarned;
            reply.pokemonId = pokemon.pokemonId;
            reply.position = -1;
        }
        else {
            reply.flag = 'fail';
            reply.position = pokemonPos;
        }
    }
    else {
        reply.flag = 'missed';
        reply.position = pokemonPos;
    }

    if(reply.flag == 'caught') {
        await PlayerEncounters.query().delete()
            .where('userId', userId);
    }
    else {
    //reset the item since the catching has finished and it isn't needed anymore
        await PlayerEncounters.query().update({
            item: null,
            candyEarned: encounter.pokemon.catchCandy,
            pokemonPos: pokemonPos,
        })
        .where('userID', userId);
    }

    await InventoryCommands.removeItems(userId, encounter.activePokeball, 1); //remove pokeball

    const pokeBalls = await InventoryCommands.getPokeballs(userId);

    let activePokeball = pokeBalls.find(el => el.itemId == encounter.activePokeball);
    //if the user has 1 pokeball and uses it then this fails. They should be prompted to swap poke balls
    if(activePokeball) {
        activePokeball.active = true;
    }

    const totalPokeballs = pokeBalls.reduce((acc, { amount }) => acc + amount, 0);

    //User has no Pokeballs so we should force quit the encounter
    if(totalPokeballs <= 0) {
        await UserCommands.update(userId, [
            { rowName: 'nextCommand', value: null}
        ]);

        await PlayerEncounters.query().delete()
            .where('userId', userId);
    }

    reply.pokeBalls = pokeBalls;
    reply.catchChance = encounter.catchChance;

    res.json(reply);
    res.end();
}

/**
 * 50% chance to move the Pokemon to a different space
 * @param {Integer} pokemonPos current space the Pokemon is on. 0, 1 or 2.
 */
function updatePokemonPosition(pokemonPos, canPokemonMove) {
    if(!canPokemonMove) {
        return pokemonPos;
    }
    let random = Math.random();
    if(random < 0.5) {
        let possible = [];
        if(pokemonPos-1 >= 0) {
            possible.push(pokemonPos-1);
        }
        if(pokemonPos+1 <= 2) {
            possible.push(pokemonPos+1);
        }
        pokemonPos = possible[Math.floor(Math.random() * possible.length)];
    }
    return pokemonPos;
}

function doesBallHit(square, pokemonPos) {
    let curve = square[0].toLowerCase();
    let tile = square[1]-1;
    
    if(curve == 's' && pokemonPos == tile) { //excellent
        return {hit: true, multiplier: 2};
    }
    else if(curve == 'l') {
        if(tile == pokemonPos) {
            return {hit: true, multiplier: 1.5};
        }
        else if(tile-1 == pokemonPos) {
            return {hit: true, multiplier: 1}
        }
        return {hit: false}
    }
    else if(curve == 'r') {
        if(tile == pokemonPos) {
            return {hit: true, multiplier: 1.5}
        }
        else if(tile+1 == pokemonPos) {
            return {hit: true, multiplier: 1}
        }
        return {hit: false}
    }
    else {
        return {hit: false}
    }
}

/*This is here because we need to include the hit object multiplier in the calculation but that doesn't get
  sent to the user.*/
function determineCircleColor(pokemon, multiplier) {
    let chance;
    const catchRate = pokemon.captureRate/100;
    const row = PowerupTable.find(el => el.level == pokemon.level);
    chance = catchRate / (row.multiplier * 2);
    if(chance > 1) {
        return 100;
    }
    chance = 1 - chance;
    chance = Math.pow(chance, multiplier);
    chance = 1 - chance;
    return chance;
}

function tryToCatch(pokemon, hitObjectMultiplier, multiplier) {
    const chance = determineCircleColor(pokemon, (hitObjectMultiplier * multiplier));
    const percent = Math.random();
    //console.log('PERCENT', percent);
    //console.log('CHANCE', chance);
    return percent < chance;
}