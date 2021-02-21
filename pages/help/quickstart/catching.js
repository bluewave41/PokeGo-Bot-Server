import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    content: theme.textContent
}));

export default function StarterPage(props) {
    const classes = useStyles();
    return (
        <div className={classes.textContent}>
            <Typography variant='h2'>
                Catching
            </Typography>
            <Typography paragraph>
                To catch a Pokemon you must throw a ball at a square it's occupying. There are 3 types of throws: L, R and S.
            </Typography>
            <Typography component='ul'>
                <li>L is a left curve throw. It will hit the square you select and the square to the left of it.</li>
                <li>R is a right curve throw. It will hit the square you select and the square to the right of it.</li>
                <li>S is a straight throw. It will hit only the selected square.</li>
            </Typography>
            <Typography paragraph>
                This means there are 7 possible valid throws.
            </Typography>
            <Typography component='ul'>
                <li>S1</li>
                <li>S2</li>
                <li>S3</li>
                <li>L2</li>
                <li>L3</li>
                <li>R1</li>
                <li>R2</li>
            </Typography>
            <Typography paragraph>
                Straight throws have the highest multiplier followed by curves that hit the Pokemon directly and finally curves that
                indirectly hit the Pokemon. If the Pokemon is in the middle and you throw L1 you will still hit the Pokemon but
                you'll get less of a multiplier than if you did L2.
            </Typography>
            <Typography paragraph>
                Now lets try throwing R2 and see if we catch the Ponyta.
            </Typography>
            <img src='/quickstart/catching1.png' />
        </div>
    )
}