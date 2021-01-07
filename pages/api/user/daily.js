const { differenceInMilliseconds, add } = require('date-fns');
import Utils from '~/lib/Utils';
import '~/lib/Database';
import Errors from '~/lib/Errors';
import CustomError from '~/lib/errors/CustomError';
import UserCommands from '~/lib/UserCommands';

export default async function handler(req, res) {
    let userId, currency, lastDaily, streak;
    
    try {
        Utils.doParametersExist(['userId'], req.body);
        userId = req.body.userId;
        ({ streak, lastDaily, currency } = await getInfo(userId));
        streak = await canWeDoDaily(lastDaily, streak);
    }
    catch(err) {
        res.json({error: Errors.getError(err.message, req.headers.errors, err.replace)});
        return res.end();
    }

    const earned = streak*100;
    if(earned > 2000) {
        earned = 2000;
    }

    await UserCommands.update(userId, [
        {rowName: 'streak', value: streak},
        {rowName: 'currency', value: earned, flag: 'increment'},
        {rowName: 'lastdaily', value: new Date()}
    ]);

    res.json({streak: streak, received: earned, currency: currency + earned});
    res.end();
}

async function getInfo(userId) {
    const data = await UserCommands.getRows(userId, ['lastDaily', 'streak', 'currency']);
    return data;
}

async function canWeDoDaily(lastDaily, streak) {
    if(!lastDaily) { //first time running daily
        return 1;
    }  

    const today = Date.now();
    const requiredForDaily = add(new Date(lastDaily), {days: 1});
    const expiredTime = add(new Date(lastDaily), {days: 2});

    if(today > expiredTime) { //daily expired
        return 1;
    }

    if(today > requiredForDaily) { //user can do daily
        return streak+1;
    }
    else {
        const ms = differenceInMilliseconds(requiredForDaily, today);
        const { hours, minutes, seconds} = Utils.msToTime(ms);
        throw new CustomError('DAILY_TOO_SOON', [hours, minutes, seconds]);
    }
}