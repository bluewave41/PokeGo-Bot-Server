import Utils from '~/lib/Utils';
import Errors from '~/lib/Errors';
import ItemList from '~/lib/ItemList';
import UserCommands from '~/lib/UserCommands';
import CustomError from '~/lib/errors/CustomError';
import InventoryCommands from '~/lib/InventoryCommands';

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

        currency = await UserCommands.getCurrency(userId);
        canBuyItem(currency, item, amount);
    }
    catch(err) {
        res.json({error: Errors.getError(err, req.headers.errors)});
        return res.end();
    }

    //we can buy the item

    if(typeof item.buy === 'function') { //run this instead of adding item to inventory
        await item.buy(userId);
    }
    else {
        //add item to inv
        await InventoryCommands.addItems(userId, item.id, amount);
    }

    await UserCommands.removeCurrency(userId, item.price * amount);

    res.json({item: item, cost: item.price * amount, newCurrency: currency-item.price*amount});
    res.end();
}

function canBuyItem(currency, item, amount) {
    if(currency < item.price * amount) {
        throw new CustomError('INSUFFICIENT_CURRENCY');
    }
    return true;
}