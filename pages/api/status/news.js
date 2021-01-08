import News from '~/knex/models/News';
import Errors from '~/lib/Errors';
import UserCommands from '~/lib/UserCommands';
import Utils from '~/lib/Utils';

export default async function handler(req, res) {
    let userId;
    if(req.headers.client == 'discord') {
        try {
            Utils.doParametersExist(['userId'], req.body, 'MISSING_PARAMETER');
            userId = req.body.userId;
        }
        catch(err) {
            res.json({error: Errors.getError(err, req.headers.errors)});
            return res.end();
        }
        
        await UserCommands.update(userId, [
            { rowName: 'nextCommand', value: 'news/ViewArticle' }
        ]);
    }

    const titles = await News.query().select('title', 'created_at');
    res.send(titles);
    res.end();
}