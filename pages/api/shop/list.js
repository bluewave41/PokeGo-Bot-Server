import Utils from '~/lib/Utils';
import Errors from '~/lib/Errors';
import ItemList from '~/lib/ItemList';

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

    res.json(ItemList.getItemsInShop());
    res.end();
}