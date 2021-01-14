import Utils from '~/lib/Utils';
import Errors from '~/lib/Errors';
import ItemList from '~/lib/ItemList';
import CustomError from '~/lib/errors/CustomError';
import User from '~/knex/models/User';
import InventoryCommands from '~/lib/InventoryCommands';
import PlayerEncounters from '~/knex/models/PlayerEncounters';

export default async function handler(req, res) {
    let userId, item;

    try {
        Utils.doParametersExist(['userId', 'name'], req.body, 'MISSING_PARAMETER');
        userId = req.body.userId;
        item = ItemList.getItem(req.body.name);

        if(item.requiresEncounter) {
            const user = await User.query().select('nextCommand')
                .withGraphFetched('encounter.[pokemon]')
                .withGraphFetched('medals')
                .where('userId', userId)
                .first();

            if(!user.encounter) {
                throw new CustomError('CANT_USE_ITEM');
            }

            let pokeBalls = await InventoryCommands.getPokeballs(userId);

            const { amount } = await InventoryCommands.getItemCount(userId, item.id);

            //can we use the item we want?
            await canUseItem(item, amount, user.nextCommand, user.encounter);

            let updateObject = {};

            if(item.use) {
                let itemUse = item.use();
                let value;
    
                switch(itemUse.flag) {
                    case 'set':
                        value = itemUse.value;
                        break;
                    case 'multiply':
                        value = user.encounter[itemUse.column] * itemUse.value;
                        break;
                    default:
                        console.log('failed to determine item function');
                        break;
                }
                updateObject[itemUse.column] = value;
            }

            let clientData = { pokemon: user.encounter.pokemon.infoForUser,
                type: 'update', position: user.encounter.pokemonPos }
            
            if(item.type != 'pokeball') {
                updateObject.item = item.id;
                user.encounter.item = item.id;
                clientData.item = {name: item.name, emoji: item.emoji, type: item.type}
                clientData.pokeBalls = pokeBalls;
            }
            else {
                user.encounter.activePokeball = item.id;
                clientData.pokeBalls = pokeBalls;
            }

            pokeBalls.find(el => el.itemId == user.encounter.activePokeball).active = true;

            //use the item
            await PlayerEncounters.query().update(updateObject)
                .where('userId', userId);

            clientData.catchChance = user.encounter.catchChance;

            res.json(clientData);
            return res.end();
        }
        else {
            //message
        }
    }
    catch(err) {
        res.json({error: Errors.getError(err, req.headers.errors)});
        return res.end();
    }

    //user is in encounter or the item doesn't require that they are

    res.end();
}

async function canUseItem(item, amount, nextCommand, encounter) {
    //are we in an encounter?
    if(nextCommand != 'encounter/SelectSquare') {
        throw new CustomError("CANT_USE_ITEM");
    }

    //do we have the item we need?
    if(!item || amount == 0) {
        throw new CustomError('OUT_OF_ITEMS');
    }

    //did we already use an item?
    if(item.type != 'pokeball' && encounter.item) {
        throw new CustomError('ALREADY_USED_ITEM');
    }
    return true;
}