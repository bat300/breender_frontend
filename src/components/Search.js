import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import { getPets } from '../redux/actions/petActions';
import SearchResults from './SearchResults';


const useStyles = makeStyles((theme) => ({
    filters: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    button: {
        margin: theme.spacing(3),
    },
    ageSlider: {
        margin: theme.spacing(4),
        width: 200,
    },
}));

function Search(props) {
    const classes = useStyles();
    var pets = useSelector((state) => state.entities.pets);

    const loadPets = async () => {
        // trigger the redux action getPets
        pets = props.dispatch(getPets(chosenSpecies, sex, breed, ageRange));
    };

    const updateFilters = async () => {
        setSpecies('');
        setSex('');
        setBreed('');
        setAgeRange([1, 10]);
        pets = props.dispatch(getPets('', '', '', [1, 10])); //change parameters manually because values remain constant inside render and are not updated immediately
    };

    const resetFilters = async () => {
        updateFilters().then(() => loadPets());
    };

    useEffect(() => {
        // load pets when the page is loaded or the pets were filtered.
        if (!pets) {
            loadPets();
        }
    }, [pets]);

    const species = ['dog', 'cat', 'rabbit', 'mouse', 'hamster', 'horse'];

    const sexes = ['female', 'male'];

    const breeds = {
        dog: ['Afador', 'Affenhuahua', 'Affenpinscher', 'Afghan Hound', 'Airedale Terrier', 'Akbash', 'Akita', 'Maltesa'],
        cat: ['Abyssinian Cat', 'American Bobtail', 'American Curl', 'American Shorthair', 'American Wirehair', 'Balinese-Javanese', 'Bengal', 'Cornish Rex', 'Devon Rex'],
        rabbit: ['American', 'Belgian Hare', 'Blanc de Hotot', 'Californian', 'Checkered Giant', 'Dutch', 'English Lop', 'English Spot', 'Flemish Giant'],
        mouse: ['Field', 'House', 'Westerm Harvest', 'White-Footed'],
        hamster: ['Dwarf Roborovski', "Campbell's Dwarf Russian", 'Syrian Golden'],
        horse: ['American Quarter', 'Arabian', 'Thoroughbred', 'Appaloosa', 'Morgan', 'Warmbloods', 'Pony'],
        '': [],
    };

    const orders = ['ascending price', 'descending price', 'newest'];

    const [chosenSpecies, setSpecies] = React.useState('');

    const handleSpeciesChange = (event) => {
        setSpecies(event.target.value);
    };

    const [sex, setSex] = React.useState('');

    const handleSexChange = (event) => {
        setSex(event.target.value);
    };

    const [breed, setBreed] = React.useState('');

    const handleBreedChange = (event) => {
        setBreed(event.target.value);
    };

    const ageMarks = [
        {
            value: 1,
            label: '1 year',
        },
        {
            value: 5,
            label: '5 years',
        },
        {
            value: 10,
            label: '10 years',
        },
        {
            value: 15,
            label: '15 years',
        },
    ];

    const [ageRange, setAgeRange] = React.useState([1, 10]);

    const handleAgeRangeChange = (event, newRange) => {
        setAgeRange(newRange);
    };

    const [order, setOrder] = React.useState('descending');

    const handleOrderChange = (event) => {
        setOrder(event.target.value);
    };

    function valuetext(value) {
        return `${value} years old`;
    }

    return (
        <div>
            <div className={classes.filters}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="species-select-label">Species</InputLabel>
                    <Select labelId="species-select-label" id="species-select" value={chosenSpecies} onChange={handleSpeciesChange}>
                        {species.map((oneSpecies) => (
                            <MenuItem key={oneSpecies} value={oneSpecies}>
                                {oneSpecies}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel id="sex-select-label">Sex</InputLabel>
                    <Select labelId="sex-select-label" id="sex-select" value={sex} onChange={handleSexChange}>
                        {sexes.map((sex) => (
                            <MenuItem key={sex} value={sex}>
                                {sex}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel id="breed-select-label">Breed</InputLabel>
                    <Select labelId="breed-select-label" id="breed-select" value={breed} onChange={handleBreedChange}>
                        {breeds[chosenSpecies].map((breed) => (
                            <MenuItem key={breed} value={breed}>
                                {breed}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel id="breed-select-label">Sort by</InputLabel>
                    <Select labelId="breed-select-label" id="sort-select" value={order} onChange={handleOrderChange}>
                        {orders.map((order) => (
                            <MenuItem key={order} value={order}>
                                {order}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <div className={classes.ageSlider}>
                    <Typography>Age Range</Typography>
                    <Slider
                        value={ageRange}
                        onChange={handleAgeRangeChange}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        getAriaValueText={valuetext}
                        min={1}
                        max={15}
                        marks={ageMarks}
                        color="secondary"
                    />
                </div>

                <Button className={classes.button} variant="contained" color="secondary" onClick={loadPets}>
                    Apply
                </Button>
                <Button className={classes.button} variant="contained" color="secondary" onClick={resetFilters}>
                    Reset filters
                </Button>
            </div>
            <SearchResults pets={pets} order={order} />
        </div>
    );
}

export default connect()(withRouter(Search));
