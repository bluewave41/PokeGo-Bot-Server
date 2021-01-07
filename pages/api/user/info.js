import Utils from '~/lib/Utils';
import Errors from '~/lib/Errors';
import '~/lib/Database';
import PokemonCommands from '~/lib/PokemonCommands';
import UserCommands from '~/lib/UserCommands';
import LevelTable from '~/lib/LevelTable';
import InventoryCommands from '~/lib/InventoryCommands';

export default async function handler(req, res) {
    let userId;
    try {
        Utils.doParametersExist(['userId'], req.body, 'MISSING_PARAMETER');
        userId = req.body.userId;
    }
    catch(err) {
        res.json({error: Errors.getError(err.message, req.headers.errors, err.replace)});
        return res.end();
    }

    const pokemonCount = await PokemonCommands.getPokemonCount(userId);
    const itemCount = await InventoryCommands.getTotalItemCount(userId);
    const user = await UserCommands.getUserInfo(userId);
    const requiredXP = LevelTable[user.level].requiredXP;
    
    res.json({pokemonCount: pokemonCount, itemCount: itemCount, currency: user.currency, xp: user.xp,
         level: user.level, requiredXP: requiredXP, totalxp: user.totalxp, stardust: user.stardust, storage: user.storage,
        itemstorage: user.itemstorage});
    res.end();
}