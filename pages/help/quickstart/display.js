import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function StarterPage(props) {
    return (
        <>
            <Typography variant='h2'>
                Display
            </Typography>
            <Typography paragraph>
                Now that we have a starter Pokemon lets take a look at its stats! You can do this with the !display command followed by
                the Pokemon's ID. My Squirtle's ID is 241 so we'll do !display 241.
            </Typography>
            <img src='/quickstart/display1.png' />
        </>
    )
}