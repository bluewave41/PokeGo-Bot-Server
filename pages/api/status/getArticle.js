import News from '~/knex/models/News';
import Utils from '~/lib/Utils';
import Errors from '~/lib/Errors';
import UserCommands from '~/lib/UserCommands';

export default async function handler(req, res) {
    let userId, articleId;
    try {
        Utils.doParametersExist(['userId', 'articleId'], req.body, 'MISSING_PARAMETER');
        userId = req.body.userId;
        articleId = Utils.isNumeric(req.body.articleId);
        if(!articleId) {
            throw new Error('NON_NUMERIC_ARTICLE');
        }
        await UserCommands.update(userId, [
            { rowName: 'nextCommand', value: null },
            { rowName: 'saved', value: null },
        ]);
    }
    catch(err) {
        res.json({error: Errors.getError(err.message, req.headers.errors, err.replace)});
        return res.end();
    }

    const article = await News.query().select('title', 'body', 'created_at')
        .where('id', articleId).first();
    res.send(article);
    res.end();
}