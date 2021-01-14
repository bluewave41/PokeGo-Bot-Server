import '~/lib/Database';
import Errors from '~/lib/Errors';
import PokemonCommands from '~/lib/PokemonCommands';
import Utils from '~/lib/Utils';

/*This will only ever be used by the bot*/

export default async function handler(req, res) {
    let userId, choice;
    try {
        Utils.doParametersExist(['userId', 'choice'], req.body);
        userId = req.body.userId;
        choice = Utils.isNumeric(req.body.choice);
        if(!choice && !Utils.isConfirmResponse(choice)) {
            throw new CustomError('INVALID_RESPONSE');
        }
    }
    catch(err) {
        res.json({error: Errors.getError(err, req.headers.errors)});
        return res.end();
    }

    if(Utils.isNumeric(choice)) { //user is customizing party

    }
    else { //user is starting battle

    }

    res.json(top3);
    res.end();
}