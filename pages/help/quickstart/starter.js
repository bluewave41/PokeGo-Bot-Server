import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function StarterPage(props) {
    return (
        <>
            <Typography variant='h2'>
                Starter
            </Typography>
            <Typography paragraph>
                Lets start by getting our starter Pokemon. You can do this with the !starter command like so.
            </Typography>
            <img src='/quickstart/starter1.png' />
            <img src='/quickstart/starter2.png' />
        </>
    )
}