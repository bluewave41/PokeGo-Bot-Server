import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function StarterPage(props) {
    return (
        <>
            <Typography variant='h2'>
                Travel
            </Typography>
            <Typography paragraph>
                Now to finish up lets move to a different space. We can do this with the !travel command which will bring up a map.
            </Typography>
            <Typography paragraph>
                As explained in the embed, moving to a new square takes 5 minutes. The further you want to go the longer it will take.
                For now lets just select S6 right beside us which will take 5 minutes.
            </Typography>
            <img src='/quickstart/travel1.png' />
            <img src='/quickstart/travel2.png' />
            <Typography paragraph>
                After 5 minutes you'll receive a DM informing you that you've moved to a different square. You will now be allowed
                to search again.
            </Typography>
        </>
    )
}