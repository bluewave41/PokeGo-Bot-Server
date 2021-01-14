import '~/lib/Database';
import Errors from '~/lib/Errors';
import PokemonCommands from '~/lib/PokemonCommands';
import Utils from '~/lib/Utils';

export default async function handler(req, res) {
    let userId;
    try {
        Utils.doParametersExist(['userId'], req.body);
        userId = req.body.userId;
    }
    catch(err) {
        res.json({error: Errors.getError(err, req.headers.errors)});
        return res.end();
    }

    const top3 = await PokemonCommands.getTop3(userId);

    res.json(top3);
    res.end();
}