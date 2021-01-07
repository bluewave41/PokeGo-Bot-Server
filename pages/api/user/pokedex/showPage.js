import Utils from '~/lib/Utils';
import Errors from '~/lib/Errors';
import '~/lib/Database';
import PokedexCommands from '~/lib/PokedexCommands';
import PokemonData from '~/lib/PokemonData';

export default async function handler(req, res) {
    let userId, page;
    try {
        Utils.doParametersExist(['userId', 'page'], req.body, 'MISSING_PARAMETER');
        userId = req.body.userId;
        page = Utils.isNumeric(req.body.page);
        if(!page) {
            throw new CustomError('NON_NUMERIC_PAGE_NUMBER');
        }
    }
    catch(err) {
        res.json({error: Errors.getError(err.message, req.headers.errors, err.replace)});
        return res.end();
    }

    const pokedex = await PokedexCommands.getPage(userId, page);
    console.log(pokedex);

    let start = (page-1)*25+1;

    const numberOfPokemon = Object.keys(PokemonData).length;
    const maxPage = Math.ceil(numberOfPokemon/25);

    if(page > maxPage) {
        res.json({error: Errors.getError('PAGE_TOO_HIGH', req.headers.errors, maxPage)});
        return res.end();
    }

    let pokemon = [];
    for(var i=start;i<=start+25;i++) {
        if(i > numberOfPokemon) {
            break;
        }
        let pokemonData = PokemonData[i];
        let data = {name: pokemonData.name, emoji: pokemonData.emoji};
        let element = pokedex.find(el => el.pokedexId == i);
        if(element) {
            data.seen = element.seen;
            data.caught = element.caught;
        }
        else {
            data.seen = 0;
            data.caught = 0;
        }
        pokemon.push(data);
    }

    res.json(pokemon);    
    res.end();
}