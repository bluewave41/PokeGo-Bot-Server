const PokemonBuilder = require('~/lib/PokemonBuilder');
import '~/lib/Database';
import Errors from '~/lib/Errors';
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

    const shadowMon = PokemonBuilder.generatePokemon(105, 40);

    res.json(shadowMon);
    res.end();
}