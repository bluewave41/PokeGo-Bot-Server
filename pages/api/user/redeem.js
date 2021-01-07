import '~/lib/Database';
import Errors from '~/lib/Errors';
import InventoryCommands from '~/lib/InventoryCommands';
import PokemonBuilder from '~/lib/PokemonBuilder';
import PokemonCommands from '~/lib/PokemonCommands';
import RedeemCodeCommands from '~/lib/RedeemCodeCommands';
import Utils from '~/lib/Utils';

export default async function handler(req, res) {
    let userId, code, items;

    try {
        Utils.doParametersExist(['userId', 'code'], req.body, 'MISSING_PARAMETER');
        userId = req.body.userId;
        code = req.body.code;
        items = await RedeemCodeCommands.getItems(code, 'INVALID_REDEEM_CODE');
    }
    catch(err) {
        res.json({error: Errors.getError(err.message, req.headers.errors, err.replace)});
        return res.end();
    }

    items = items.split('|');

    for(var i=0;i<items.length;i++) {
        let item = items[i].split(',');
        if(item[0] == 'i') {
            await InventoryCommands.addItems(userId, item[1], item[2]);
        }
        else if(item[0] == 'p') {
            let flags = {};
            for(var j=2;j<item.length;j++) { //flags
                let flag = item[j].split('=');
                if(flag[1] == 'true') {
                    flags[flag[0]] = true;
                }
                else {
                    flags[flag[0]] = parseInt(flag[1]);
                }
            }
            let pokemon = PokemonBuilder.generatePokemon(item[1], 5, userId, flags);
            await PokemonCommands.catchPokemon(userId, pokemon, 3);
        }
    }

    res.end();
}