import Errors from '~/lib/Errors';
import CustomError from '~/lib/errors/CustomError';
import UserCommands from '~/lib/UserCommands';

const Starters = require('./Starters');
const Utils = require('~/lib/Utils');

export default async function handler(req, res) {
    let userId;

    try {
        Utils.doParametersExist(['userId'], req.body, 'MISSING_PARAMETER');
        userId = req.body.userId;
        await canWeGetStarter(userId);
    }
    catch(err) {
        res.json({error: Errors.getError(err.message, req.headers.errors, err.replace)});
        return res.end();
    }

    await UserCommands.updateNextCommand(userId, 'starter/SelectStarterPokemon');

	res.json(Starters.map(el => [el[1], el[2]])); //remove pokedex ID
}

async function canWeGetStarter(userId) {
    const gotStarter = await UserCommands.getField(userId, 'gotStarter');
    if(gotStarter) {
        throw new CustomError('ALREADY_HAVE_STARTER');
    }
}