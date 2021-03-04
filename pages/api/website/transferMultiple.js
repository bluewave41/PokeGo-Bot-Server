import Utils from '~/lib/Utils';
import Errors from '~/lib/Errors';
import '~/lib/Database';
import PokemonCommands from '~/lib/PokemonCommands';
import { applySession } from 'next-session';
import Pokemon from '~/knex/models/Pokemon';
import Candy from '~/knex/models/Candy';
import { raw } from 'objection';
import CustomError from '~/lib/errors/CustomError';

export default async function handler(req, res) {
	await applySession(req, res);
    let userId, selected;
    try {
        Utils.doParametersExist(['userId'], req.session.user);
		Utils.doParametersExist(['selected'], req.body);
        userId = req.session.user.userId;
        selected = req.body.selected;

        if(!Array.isArray(selected)) {
            throw new CustomError('INVALID_TYPE', ['selected', 'array']);
        }
        		
		//make sure they're all pokemon IDs
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

    let selectedPokemon = await PokemonCommands.getAllPokemon(userId);
	
	const changed = await Pokemon.query().delete()
        .whereIn('pokemonId', selected);

    selectedPokemon = selectedPokemon.filter(el => selected.includes(el.pokemonId));
        		
    /*Give candy
      Can't do them all in 1 query because they have different where conditions
    */
    for(var i=0;i<selectedPokemon.length;i++) {
        await Candy.query().increment('amount', 1)
            .where('userId', userId)
            .where('candyID', selectedPokemon[i].candyId)
    }

    res.json({ changed: changed });

    res.end();
}