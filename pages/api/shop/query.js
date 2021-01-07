import Utils from '~/lib/Utils';
import Errors from '~/lib/Errors';
import ItemList from '~/lib/ItemList';

export default async function handler(req, res) {
    let userId, action, item, amount;

    try {
        Utils.doParametersExist(['userId', 'action', 'item'], req.body, 'MISSING_PARAMETER');
        userId = req.body.userId;
        action = Utils.findElement(['buy', 'sell', 'list'], req.body.action);
        item = ItemList.getItem(req.body.name);
        amount = Utils.isNumeric(req.body.amount);
        if(!amount) {
            throw new CustomError('INVALID_PURCHASE_AMOUNT');
        }
    }
    catch(err) {
        res.json({error: Errors.getError(err.message, req.headers.errors, err.replace)});
        return res.end();
    }

    res.end();
}