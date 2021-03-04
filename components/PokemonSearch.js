import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import { useDebouncedCallback } from 'use-debounce';

const useStyles = makeStyles((theme) => ({
    input: {
        backgroundColor: '#333',
        textAlign: 'center',
        marginTop: '10px',
        textAlign: 'center',
    },
    root: {
        display: 'flex',
        justifyContent: 'center',
        position: 'sticky',
        top: theme.mixins.toolbar.minHeight
    }
}));

/*
    Valid flags:
    - pokemon name
    - shadow
    - shiny
    - 0*, 1*, 2*, 3*, 4*
*/

export default function PokemonSearch(props) {
    const classes = useStyles();
    const debounced = useDebouncedCallback((value) => {
        props.filterList(value);
      }, 200);

    const validTags = [
        { name: 'shiny', value: 'shiny' },
        { name: 'shadow', value: 'shadow' },
        { name: '0*', value: 'zeroStar' },
        { name: '1*', value: 'oneStar' },
        { name: '2*', value: 'twoStar' },
        { name: '3*', value: 'threeStar' },
        { name: '4*', value: 'fourStar' },
    ];

    const onChange = (event) => {
        const text = event.target.value.toLowerCase().split(',');
        let searchOptions = {
            shiny: false,
            shadow: false,
            zeroStar: false,
            oneStar: false,
            twoStar: false,
            threeStar: false,
            fourStar: false,
            name: '',
            showAll: true,
        }
        if(!event.target.value.length) {
            debounced.callback(searchOptions);
            return;
        }
        for(var i=0;i<text.length;i++) {
            let good = false;
            for(var j=0;j<validTags.length;j++) {
                if(text[i] == validTags[j].name) {
                    searchOptions[validTags[j].value] = true;
                    searchOptions.showAll = false;
                    good = true;
                    break;
                }
            }
            if(!good && !searchOptions.name) {
                searchOptions.name = text[i];
                searchOptions.showAll = false;
            }
        }
        debounced.callback(searchOptions);
    }

    return (
        <div className={classes.root}>
            <Input 
                classes={{
                    input: classes.input
                }}
                placeholder="Search"
                onChange={onChange}
            />
        </div>
    )
}