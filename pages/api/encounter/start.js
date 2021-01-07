const User = require('~/knex/models/User');
const PlayerEncounters = require('~/knex/models/PlayerEncounters'); 
import Caught from '~/knex/models/Caught';
import CurrentEncounters from '~/knex/models/CurrentEncounters';
import '~/lib/Database';
import Errors from '~/lib/Errors';
import CustomError from '~/lib/errors/CustomError';
import InventoryCommands from '~/lib/InventoryCommands';
import ItemList from '~/lib/ItemList';
import PokedexCommands from '~/lib/PokedexCommands';
import PokestopCommands from '~/lib/PokestopCommands';
import Types from '~/lib/Types';
import UserCommands from '~/lib/UserCommands';
import Utils from '~/lib/Utils';

export default async function handler(req, res) {
    let userId, position, pokeBalls, user;

    /*This could be either a pokestop or a pokemon*/

    try {
        Utils.doParametersExist(['userId', 'position'], req.body, 'MISSING_PARAMETER');
        userId = req.body.userId;
        position = Utils.isNumeric(req.body.position);
        if(!position) {
            throw new CustomError('NON_NUMERIC_CHOICE');
        }

        user = await User.query().select('level', 'itemstorage', 'secretId')
            .withGraphFetched('medals')
            .where('userId', userId).first();
    }
    catch(err) {
        res.json({error: Errors.getError(err.message, req.headers.errors, err.replace)});
        return res.end();
    }

    //correct parameters are given

    //make sure user is in an encounter
    const { sprites } = (await UserCommands.getSaved(userId));
    if(!sprites) {
        let err = new CustomError('NO_ENCOUNTER');
        res.json({error: Errors.getError(err.message, req.headers.errors, err.replace)});
        return res.end();
    }

    //make sure the number is in range of the list
    if(position > sprites.length) {
        const err = new CustomError('INVALID_RANGE_CHOICE', sprites.length);
        res.json({error: Errors.getError(err.message, req.headers.errors, err.replace)});
        return res.end();
    }

    const encounter = sprites[position-1];

    if(encounter.type == 'pokestop') {
         try {
            const receivedItems = await spinPokestop(userId, user.level, user.itemstorage, encounter);
            res.send({items: receivedItems, type: 'pokestop'});
        }
        catch(err) {
            res.json({error: Errors.getError(err.message, req.headers.errors, err.replace)});
        }
        finally {
            await User.query().update({
                nextCommand: null,
                saved: null
            })
            .where('userId', userId);
            return res.end();
        }
    }

    //this must be a pokemon encounter

    //check for pokeballs
    pokeBalls = await InventoryCommands.getPokeballs(userId);
    if(!pokeBalls.length) {
        const err = new CustomError('INSUFFICIENT_POKEBALLS');
        res.json({ error: Errors.getError(err.message, req.headers.errors, err.replace) });
        return res.end();
    }

    //user has enough pokeballs so the encounter is valid

    //pokemon should be added to caught table here in case they quit
    await Caught.query().insert({
        userID: userId,
        encounterId: encounter.encounterId,
    });

    //update the seen entry for pokedex
    await PokedexCommands.insert(userId, encounter.pokedexId, false);

    //get the pokemon
    const pokemon = await CurrentEncounters.query().select('*')
        .where('encounterId', encounter.encounterId)
        .first();

    //if its level is higher than yours it needs to be set to something under your level
    if(pokemon.level > user.level) {
        pokemon.level = Utils.getRandomInt(1, user.level);
    }

    pokeBalls = pokeBalls.sort((a, b) => a.itemId - b.itemId);

    
    //add encounter data to the pokemon
    pokemon.userId = userId;
    pokemon.candyEarned = pokemon.catchCandy;
    pokemon.activePokeball = pokeBalls[0].itemId;
    pokemon.medalMultiplier = calculateMedalMultiplier(pokemon, user.medals);
    pokemon.shiny = pokemon.shinyId == user.secretId;
    pokemon.cp = pokemon.calculateCP();

    delete pokemon['shinyId'];

    //add the encounter data
    const insertedEncounter = await PlayerEncounters.query().insert(pokemon);

    //add active ball to inventory
    pokeBalls.find(el => el.itemId == insertedEncounter.activePokeball).active = true;

    //setup the user for the catching phase
    await UserCommands.update(userId, [
        { rowName: 'nextCommand', value: 'encounter/SelectSquare' }
    ]);

    const circleColor = insertedEncounter.catchChance;
    console.log(circleColor)

    res.json({pokemon: insertedEncounter.infoForUser, pokeBalls: pokeBalls,
        position: 1, catchChance: circleColor, type: 'pokemon'});
    res.end();
}

async function spinPokestop(userId, level, storageLimit, pokestop) {
    const itemCount = await InventoryCommands.getTotalItemCount(userId);
    if(itemCount >= storageLimit) {
        throw new CustomError('ITEM_STORAGE_FULL');
    }

    const possibleItems = ItemList.getPokestopItems(level);
    let receivedItems = [];
    let amount = Math.floor(Math.random() * 3) + 3;
    for(var i=0;i<amount;i++) {
        let item = possibleItems[Math.floor(Math.random() * possibleItems.length)];
        receivedItems.push(item);
        await InventoryCommands.addItems(userId, item.id, 1);
    }

    await PokestopCommands.spin(userId, pokestop.id);

    return receivedItems;
}

function calculateMedalMultiplier(pokemon, medals) {
    const types = pokemon.types;
    const type1 = Types[types[0]];
    const type2 = Types[types[1]] || null;

    let type1Medal = medals.find(el => el.medalId == type1);
    let type2Medal;
    if(type1Medal) {
        type1Medal = type1Medal.multiplier;
    }
    else {
        type1Medal = 1;
    }
    if(type2) {
        type2Medal = medals.find(el => el.medalId == type2);
        if(type2Medal) {
            type2Medal = type2Medal.multiplier;
        }
        else {
            type2Medal = 1;
        }
    }

    let multiplier = 1;

    //calculate average
    if(type1Medal && type2Medal) {
        multiplier *= (type1Medal + type2Medal) / 2;
    }
    //pokemon only has 1 type
    else {
        multiplier *= type1Medal;
    }

    return multiplier;
}