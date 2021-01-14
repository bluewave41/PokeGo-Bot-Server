import Utils from '~/lib/Utils';
import Errors from '~/lib/Errors';
import '~/lib/Database';
import UserCommands from '~/lib/UserCommands';
import CustomError from '~/lib/errors/CustomError';
import Powerups from '~/knex/models/Powerups';

export default async function handler(req, res) {
    let userId, nextCommand;
    try {
        Utils.doParametersExist(['userId', 'nextCommand'], req.body, 'MISSING_PARAMETER');
        userId = req.body.userId;
        nextCommand = req.body.nextCommand;
        isQuittable(nextCommand);
    }
    catch(err) {
        res.json({error: Errors.getError(err, req.headers.errors)});
        return res.end();
    }

    switch(nextCommand) {
        case 'encounter/SelectSquare':
        case 'transfer/ConfirmTransfer':
        case 'mail/ClaimRewards':
            await UserCommands.reset(userId);
            break;
        case 'powerup/PowerupResponse':
            await Powerups.query().delete()
                .where('userId', userId);
            break;
    }

    //always need to reset this, only reset savedVariable on some which is above
    await UserCommands.update(userId, [
        { rowName: 'nextCommand', value: null}
    ]);
    
    res.end();
}

function isQuittable(nextCommand) {
    switch(nextCommand) {
        case 'encounter/SelectSquare':
        case 'travel/SelectLocation':
        case 'encounter/StartEncounter':
        case 'transfer/ConfirmTransfer':
        case 'mail/OpenMail':
        case 'mail/ClaimRewards':
        case 'starter/SelectStarterPokemon':
        case 'powerup/PowerupResponse':
            return true;
        default:
            throw new CustomError('NON_QUITTABLE');
    }
}