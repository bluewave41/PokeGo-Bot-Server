const fs = require('fs').promises;
const User = require('~/knex/models/User');
import Errors from '~/lib/Errors';
import Utils from '~/lib/Utils';
import '~/lib/Database';
import TravelRequests from '~/knex/models/TravelRequests';

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

    //is the user already travelling?
    const travelRequest = await TravelRequests.query().select('*')
        .where('userId', userId);
    
    //temporary code
    if(travelRequest.length) {
        res.json({error: `You're already travelling somewhere!`});
        return res.end();
    }

    await User.query().update({
        nextCommand: 'travel/SelectLocation',
    })
    .where('userId', userId);

    let map = await fs.readFile('public/numberedmap.png', 'base64');
    res.send(map);
    res.end();
}