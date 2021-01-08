module.exports = {
    discord: {
        en: {
            'INSUFFICIENT_CANDY': "You need at least {replace} candy to level this Pokemon up further!",
            'INVALID_NICKNAME_LENGTH': "Nicknames must be between 1 and 20 characters.",
            'INVALID_NICKNAME': 'Nicknames can only contain letters and numbers.',
            'INVALID_PURCHASE_AMOUNT': `You can't buy {replace} amount of items.`,
            'NO_ITEM_EXISTS': `There are no items with {replace} in them.`,
            'INVALID_TRAVEL_LOCATION': "There isn't anything there.",
            'INSUFFICIENT_POKEBALLS': "You have no Poke balls! You can't catch Pokemon without any.",
            'CELL_EMPTY': "It looks like there are no Pokemon here right now. Try again later!",
            'NO_ENCOUNTER': "You aren't in an encounter.",
            'POWERUP_AMOUNT_INVALID': "You can't powerup a pokemon {replace} times.",
            'POWERUP_TOO_HIGH': "You can only power up this Pokemon {replace} times.",
            'NON_NUMERIC_POKEMON_ID': "Pokemon ID must be numeric.",
            'NEGATIVE_POKEMON_ID': "Pokemon IDs can't be 0 or negative.",
            'NO_POKEMON': "You don't have a Pokemon with the ID {replace}.",
            'NON_NUMERIC_SERVER_ID': "Server ID must numeric.",
            'INVALID_STARTER': "That isn't a valid starter Pokemon.",
            'INVALID_PREFIX_LENGTH': "Prefixes must be between 1 and 3 characters.",
            'MISSING_PARAMETER': `You're missing a {replace}.`,
            'INVALID_TRANSFER_CHOICE': 'Cancelling transfer.',
            'CANT_TRANSFER_LAST_POKEMON': `You can't transfer your last Pokemon.`,
            'GENERIC_NOT_NUMERIC': `Value wasn't numeric.`,
            'NON_NUMERIC_CHOICE': "Your choice wasnt numeric.",
            'INVALID_RANGE_CHOICE': `Your choice must be between 1 and {replace}.`,
            'INVALID_SQUARE': "You can't throw like that.",
            'INVALID_REDEEM_CODE': "That redeem code is invalid,",
            'NO_EVOLUTIONS': `That Pokemon can't evolve.`,
            'INSUFFICIENT_EVOLVE_CANDY': `You need {replace} candy to evolve this.`,
            'CANT_TRANSFER_FAVORITE': `You can't transfer a favorited Pokemon.`,
            'NON_NUMERIC_PAGE_NUMBER': 'Page numbers must be numeric.',
            'INSUFFICIENT_CURRENCY': `You don't have enough money for that.`,
            'NOT_ENOUGH_ITEMS': `You don't have enough items to sell.`,
            'NON_NUMERIC_MAIL_ID': "Mail IDs must be numeric.",
            'NO_MAIL': `You don't have mail with the ID {replace}.`,
            'ALREADY_CLAIMED': `You already claimed rewards from that mail.`,
            'STORAGE_FULL': `Your Pokemon storage is full. Either transfer some Pokemon or purchase an upgrade.`,
            'NON_QUITTABLE': "You can't quit this interface.",
            'ALREADY_HAVE_STARTER': 'You already have a starter Pokemon.',
            'NON_NUMERIC_ARTICLE': `News article IDs must be numeric.`,
            'DAILY_TOO_SOON': `You've already received your daily today.\n You can do it again in {replace} hours {replace} minutes and {replace} seconds.`,
            'ITEM_STORAGE_FULL': `You're out of item storage! Sell some items or purchase a storage upgrade.`,
            'PAGE_TOO_HIGH': `You can only select pages 1-{replace}.`,
            'CANT_USE_ITEM': `You need to be in an encounter to use that item!`,
            'ALREADY_USED_ITEM': `You already have an item active.`,
            'OUT_OF_ITEMS': `You don't have any of those to use!`,
            'ALREADY_SELECTED_TEAM': `You already belong to a team.`,
            'TEAM_LEVEL_TOO_LOW': `You need to be level 5 before you can select a team.`,
            'NO_POKEBALL_TYPE': `You don't have any Poke balls of that type! Select another.`,
            'NOT_ADMIN': `You need to be an administrator to run this command!`,
            'INVALID_RESPONSE': `You provided an invalid response. If you're stuck, use the quit command.`,
            'LEVEL_TOO_HIGH': `You can only powerup this Pokemon {replace} times!`,
        }
    },
    site: {
        en: {
            'MISSING_PARAMETER': `Missing {replace} parameter.`,
        }
    },
    getError(error, errorGroup) {
        console.error(error.stack);
        const replacements = [].concat(error.replace || []);
        let errorMessage = this[errorGroup]['en'][error.message];
        if(!errorMessage) {
            return `I got ${error.message} but it wasn't in the list.`;
        }
        for(var i=0;i<replacements.length;i++) {
            errorMessage = errorMessage.replace('{replace}', replacements[i]);
        }
        return errorMessage;
    }
}