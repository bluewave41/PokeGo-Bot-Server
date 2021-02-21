import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function StarterPage(props) {
    return (
        <>
            <Typography variant='h2'>
                Search
            </Typography>
            <Typography paragraph>
                Now its time to catch some new Pokemon. We can see what's currently in the area with the !search command.
            </Typography>
            <Typography paragraph>
                Lets try to catch the Ponyta. We can select it by typing its number.
            </Typography>
            <img src='/quickstart/search1.png' />
            <img src='/quickstart/search2.png' />
        </>
    )
}