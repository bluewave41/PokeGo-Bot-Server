import Utils from '~/lib/Utils';
import Errors from '~/lib/Errors';
import ItemList from '~/lib/ItemList';
import UserCommands from '~/lib/UserCommands';
import InventoryCommands from '~/lib/InventoryCommands';
import CustomError from '~/lib/errors/CustomError';

export default async function handler(req, res) {
    let userId, item, amount, currency;

    try {
        Utils.doParametersExist(['userId', 'name', 'amount'], req.body, 'MISSING_PARAMETER');
        userId = req.body.userId;
        item = ItemList.getItem(req.body.name);
        amount = Utils.isNumeric(req.body.amount);
        if(!amount) {
            throw new CustomError('INVALID_PURCHASE_AMOUNT');
        }
        ({ currency } = await UserCommands.getRows(userId, 'currency'));

        const { amount: itemCount } = await InventoryCommands.getItemCount(userId, item.id);
        canSellItems(itemCount, amount);
    }
    catch(err) {
        res.json({error: Errors.getError(err.message, req.headers.errors, err.replace)});
        return res.end();
    }

    await InventoryCommands.removeItems(userId, item.id, amount);
    await UserCommands.addCurrency(userId, item.sellPrice * amount);

    res.json({item: item, cost: item.sellPrice*amount, newCurrency: currency + item.sellPrice * amount});
    res.end();
}

function canSellItems(itemCount, amount) {
    console.log(itemCount, amount)
    if(itemCount < amount) {
        throw new CustomError('NOT_ENOUGH_ITEMS');
    }
}