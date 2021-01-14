import Utils from '~/lib/Utils';
import Errors from '~/lib/Errors';
import '~/lib/Database';
import PokemonCommands from '~/lib/PokemonCommands';
import { applySession } from 'next-session';
import { raw } from 'objection';
import Pokemon from '~/knex/models/Pokemon';
import CustomError from '~/lib/errors/CustomError';

/**
 * Handles the favoriting of multiple Pokemon from the online dashboard.
 * @param {*} req 
 * @param {*} res
 * 
 * Prerequesites:
 *  - User must be logged in
 *  - session cookie must be supplied
 *  - selected must be an array
 *  - all Pokemon IDs must be ints
 *  - all Pokemon must belong to the user 
 */
export default async function handler(req, res) {
	await applySession(req, res);
    let userId, selected;
    console.log(req.body);
    try {
        Utils.doParametersExist(['userId'], req.session.user);
		Utils.doParametersExist(['selected'], req.body);
        userId = req.session.user.userId;
        selected = req.body.selected;

        //selected must be an array
        if(!Array.isArray(selected)) {
            throw new CustomError('INVALID_TYPE', ['selected', 'array']);
        }
		
		//make sure they're all Pokemon IDs
		for(var i=0;i<selected.length;i++) {
			if(!Utils.isNumeric(selected[i])) {
				throw new CustomError('INVALID_POKEMON_ID', selected[i]);
			}
        }
        
        //make sure user is owner of all those Pokemon
	    const pokemon = await PokemonCommands.getAllPokemon(userId);
	    for(var i=0;i<selected.length;i++) {
		    let element = pokemon.find(el => el.pokemonId == selected[i]);
		    if(!element) {
			    throw new CustomError('NO_POKEMON', selected[i]);
		    }
	    }
    }
    catch(err) {
        res.json({error: Errors.getError(err, 'site')});
        return res.end();
    }
		
	const result = await Pokemon.query().update({
		favorite: raw('!favorite')
	})
    .whereIn('pokemonId', selected);

    res.json({changed: result});
    
    res.end();
}