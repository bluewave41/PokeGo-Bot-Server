const Pokemon = require('~/knex/models/Pokemon');
import '~/lib/Database';
import ErrorList from '~/lib/Errors';
import CustomError from '~/lib/errors/CustomError';
import Utils from '~/lib/Utils';

export default async function handler(req, res) {
    let userId, offset;
    try {
        Utils.doParametersExist(['userId', 'offset'], req.body, 'MISSING_PARAMETER');
        userId = req.body.userId;
        offset = Utils.isNumeric(req.body.offset);
        if(!offset) {
            throw new CustomError('NON_NUMERIC_POKEMON_ID');
        }
        offset = offset * 25 - 25;
    }
    catch(err) {
        res.json({error: ErrorList.getError(err.message, req.headers.errors, err.replace)});
        return res.end();
    }

    let query = Pokemon.query().select('*')
        .offset(offset)
        .limit(25)
        .where('ownerId', userId);

    let count = Pokemon.query().count('* as pokemonCount')
        .where('ownerId', userId);

    if(req.body.parameters) {
        const parameters = req.body.parameters.split(',');
        for(var i=0;i<parameters.length;i++) {
            if(parameters[i] == 'favorite') {
                query.where('favorite', true);
                count.where('favorite', true);
            }
            else if(parameters[i] == 'shiny') {
                query.where('shiny', true);
                count.where('shiny', true);
            }
            else {
                let char = parameters[i].includes('<') ? '<' : parameters[i].includes('>') ? '>' : parameters[i].includes('=') ? '=' : '';
                if(char) {
                    let split = parameters[i].split(char);
                    query.where('totalIV', char, split[1]);
                    count.where('totalIV', char, split[1]);
                }
                const id = Utils.getIdFromName(parameters[i]);
                if(id) {
                    query.where('pokedexId', id);
                    count.where('pokedexId', id);
                }
            }
        }
    }

    let pokemon = await query.debug();
    count = await count;
    res.json({list: pokemon, totalpokemon: count[0].pokemonCount});
    res.end();
}