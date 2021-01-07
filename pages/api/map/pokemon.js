const CurrentEncounters = require('~/knex/models/CurrentEncounters');
const User = require('~/knex/models/User');
const Caught = require('~/knex/models/Caught');
import Pokestops from '~/knex/models/Pokestops';
import SpunPokestops from '~/knex/models/SpunPokestops';
import '~/lib/Database';
import Errors from '~/lib/Errors';
import CustomError from '~/lib/errors/CustomError';
import InventoryCommands from '~/lib/InventoryCommands';
import PokemonCommands from '~/lib/PokemonCommands';
import SpriteList from '~/lib/SpriteList';
import UserCommands from '~/lib/UserCommands';
import Utils from '~/lib/Utils';

export default async function handler(req, res) {
    let userId;

    try {
        Utils.doParametersExist(['userId'], req.body, 'MISSING_PARAMETER');
        userId = req.body.userId;
        await canAccess(userId);
    }
    catch(err) {
        res.json({error: Errors.getError(err.message, req.headers.errors, err.replace)});
        return res.end();
    }

    let user = await User.query().select('location', 'secretId')
    .where('userId', userId);

    let secretId = user[0].secretId;
    let location = user[0].location;
    
    let spriteList = new SpriteList();

    //get pokemon
    let pokemon = await CurrentEncounters.query().select('*')
    .whereNotIn(
        'encounterId', 
        Caught.query().select('encounterId')
        .where('userId', userId)
    )
    .where('cell', location);

    //get pokestops
    let pokestops = await Pokestops.query().select('*')
    .whereNotIn(
        'id',
        SpunPokestops.query().select('pokestopId')
        .where('userId', userId)
    )
    .where('cell', location);

    //save this

    //add shiny markers
    if(pokemon.length) {
        pokemon.forEach(function(pokemon) {
            if(pokemon.shinyId == secretId) {
                pokemon.shiny = true;
            }
        });
    }

    spriteList.addSprites(pokemon, 'pokemon');
    spriteList.addSprites(pokestops, 'pokestop');
    
    if(spriteList.length) {
        await User.query().update({
            saved: JSON.stringify(spriteList),
            nextCommand: 'encounter/StartEncounter',
        })
        .where('userId', userId);
        res.json(JSON.stringify(spriteList));
    }
    else {
        let err = new CustomError('CELL_EMPTY');
        res.json({error: Errors.getError(err.message, req.headers.errors)});
    }

    res.end();
}

async function canAccess(userId) {
    const pokeBallCount = await InventoryCommands.getPokeballs(userId);
    if(!pokeBallCount.length) {
        throw new CustomError('INSUFFICIENT_POKEBALLS');
    }

    const storageAmount = await UserCommands.getRows(userId, 'storage');
    const pokemonCount = await PokemonCommands.getPokemonCount(userId);
    if(pokemonCount+1 > storageAmount) {
        throw new CustomError('STORAGE_FULL');
    }
    return true;
}