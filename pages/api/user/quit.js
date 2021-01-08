import Utils from '~/lib/Utils';
import Errors from '~/lib/Errors';
import '~/lib/Database';
import UserCommands from '~/lib/UserCommands';
import CustomError from '~/lib/errors/CustomError';
import Transfers from '~/knex/models/Transfers';
import Powerups from '~/knex/models/Powerups';
import PlayerEncounters from '~/knex/models/PlayerEncounters';
import PlayerMail from '~/knex/models/PlayerMail';

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
            await PlayerEncounters.query().delete()
                .where('userId', userId);
            break;
        case 'transfer/ConfirmTransfer':
            await Transfers.query().delete()
                .where('userId', userId);
            break;
        case 'powerup/PowerupResponse':
            await Powerups.query().delete()
                .where('userId', userId);
            break;
        case 'mail/ClaimRewards':
            await PlayerMail.query().delete()
                .where('userId', userId);
            break;
    }

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