import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function StarterPage(props) {
    return (
        <>
            <Typography variant='h2'>
                List
            </Typography>
            <Typography paragraph>
                Now lets take a look at all the Pokemon we have. We only have 1 of course but we can view them all with the !list command.
            </Typography>
            <img src='/quickstart/list1.png' />
        </>
    )
}