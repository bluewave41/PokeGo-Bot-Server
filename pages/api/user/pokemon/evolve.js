import CandyCommands from '~/lib/CandyCommands';
import '~/lib/Database';
import Errors from '~/lib/Errors';
import CustomError from '~/lib/errors/CustomError';
import PokemonCommands from '~/lib/PokemonCommands';
import Utils from '~/lib/Utils';

export default async function handler(req, res) {
    let userId, pokemonId, pokemon, candy;
    try {
        Utils.doParametersExist(['userId', 'pokemonId'], req.body, 'MISSING_PARAMETER');
        userId = req.body.userId;
        pokemonId = Utils.isNumeric(req.body.pokemonId);
        if(!pokemonId) {
            throw new CustomError('NON_NUMERIC_POKEMON_ID');
        }
        pokemon = await PokemonCommands.getStrictPokemon(userId, pokemonId, 'NO_POKEMON');

        doesPokemonEvolve(pokemon);
        
        candy = await CandyCommands.getCandyForPokemon(userId, pokemon.candyId);

        isPokemonEvolvable(candy, pokemon.evolveCost);
    }
    catch(err) {
        res.json({error: Errors.getError(err, req.headers.errors)});
        return res.end();
    }

    //evolution is good

    const oldName = pokemon.name;
    const evolveCost = pokemon.evolveCost;

    pokemon = await PokemonCommands.evolvePokemon(userId, pokemon);

    res.json({oldName: oldName, pokemon: pokemon, remainingCandy: candy-evolveCost});

    res.end();
}

function doesPokemonEvolve(pokemon) {
    if(!pokemon.evolveCost) {
        throw new CustomError('NO_EVOLUTIONS');
    }
    return true;
}

function isPokemonEvolvable(candyAmount, requiredAmount) {
    if(candyAmount < requiredAmount) {
        throw new CustomError('INSUFFICIENT_EVOLVE_CANDY', requiredAmount);
    }
    return true;
}