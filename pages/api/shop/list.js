import Utils from '~/lib/Utils';
import Errors from '~/lib/Errors';
import ItemList from '~/lib/ItemList';
import User from '~/knex/models/User';

export default async function handler(req, res) {
    let userId;

    try {
        Utils.doParametersExist(['userId'], req.body, 'MISSING_PARAMETER');
        userId = req.body.userId;
    }
    catch(err) {
        res.json({error: Errors.getError(err, req.headers.errors)});
        return res.end();
    }

    const user = await User.query().select('level', 'currency')
        .where('userId', userId).first();

    res.json({ items: ItemList.getItemsInShop(user.level), currency: user.currency });
    res.end();
}