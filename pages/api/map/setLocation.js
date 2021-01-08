const User = require('~/knex/models/User');
const Coordinates = require('./Coordinates');
import Utils from '~/lib/Utils';
import Errors from '~/lib/Errors';
import '~/lib/Database';
import UserCommands from '~/lib/UserCommands';
import TravelRequests from '~/knex/models/TravelRequests';

export default async function handler(req, res) {
    let userId, location;
    try {
        Utils.doParametersExist(['userId', 'location'], req.body, 'MISSING_PARAMETER');
        userId = req.body.userId;
        location = Utils.findElement(Coordinates.all, req.body.location, null, 'INVALID_TRAVEL_LOCATION');
    }
    catch(err) {
        res.json({error: Errors.getError(err, req.headers.errors)});
        return res.end();
    }

    const oldLocation = await UserCommands.getField(userId, 'location');

    const distance = Math.abs(oldLocation.toLowerCase().charCodeAt(0) - location.toLowerCase().charCodeAt(0)) +
                     Math.abs(parseInt(oldLocation.slice(1)) - parseInt(location.slice(1)));

    //add the travel request
    await TravelRequests.query().insert({
        userId: userId,
        location: location
    });

    //reset the user
    await User.query().update({
        nextCommand: null,
        saved: null,
    })
    .where('userId', userId);

    res.json({location: location, time: distance*5});

    res.end();
}