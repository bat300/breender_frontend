import React, { useEffect, useRef } from 'react';
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
import Box from '@material-ui/core/Box';
import Pagination from '@material-ui/lab/Pagination';
import { getPets } from '../redux/actions/petActions';
import SearchResults from '../components/search/SearchResults';
import { breeds } from 'helper/data/breeds';
import HomeLogo from 'images/home.svg';
import { Grid } from '@material-ui/core';
import { useUser } from 'helper/hooks/auth.hooks';
import { useLoggedInUser } from 'helper/hooks/auth.hooks';
import PremiumBanner from 'components/PremiumBanner';
import { showPremiumBanner } from 'helper/helpers';
import { getUsersInfo } from 'redux/actions';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    button: {
        margin: theme.spacing(2),
    },
    ageSlider: {
        margin: theme.spacing(4),
        marginLeft: 50,
        marginRight: 50,
        width: 200,
    },
    homeLogo: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 50,
        marginRight: 150,
    },
    darkSlider: {
        color: theme.palette.primary.dark,
    },
    filters: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'center',
    },
}));

function SearchView(props) {
    const searchRef = useRef();
    const classes = useStyles();
    let pets = useSelector((state) => state.pets.pets); // get pets from redux store
    let user = useUser();
    // for scrolling to the search
    const loggedInUser = useLoggedInUser();
    const totalPages = useSelector((state) => state.pets.pets.totalPages);

    const [isLoading, setIsLoading] = React.useState(true);
    const [chosenSpecies, setSpecies] = React.useState('');
    const [order, setOrder] = React.useState('');
    const [sex, setSex] = React.useState('');
    const [breed, setBreed] = React.useState('');
    const [ageRange, setAgeRange] = React.useState([0.5, 10]);

    const sexes = ['female', 'male'];
    const orders = ['ascending price', 'descending price', 'newest'];

    const ageMarks = [
        {
            value: 0.5,
            label: '6 months',
        },
        {
            value: 5,
            label: '5 years',
        },
        {
            value: 10,
            label: '10 years',
        },
    ];

    const loadPets = async (pageValue?) => {
        // trigger the redux action getPets
        let pageToFetch = pageValue ? pageValue : 1;
        pets = props.dispatch(getPets(chosenSpecies, sex, breed, ageRange, pageToFetch, false, user));
    };

    useEffect(() => {
        props.dispatch(getUsersInfo(user.id));
    }, []);

    useEffect(() => {
        // load pets when the page is loaded or the pets were filtered.
        if (!pets || isLoading) {
            loadPets(1);
            setIsLoading(false);
        }
    }, [pets]);

    const updateFilters = async () => {
        setSpecies('');
        setSex('');
        setBreed('');
        setAgeRange([1, 10]);
        pets = props.dispatch(getPets('', '', '', [0.5, 10], 1, false, user)); //change parameters manually because values remain constant inside render and are not updated immediately
    };

    const resetFilters = async () => {
        updateFilters();
    };

    const handleSpeciesChange = (event) => {
        setSpecies(event.target.value);
    };

    const handleSexChange = (event) => {
        setSex(event.target.value);
    };

    const handleBreedChange = (event) => {
        setBreed(event.target.value);
    };

    const handleAgeRangeChange = (event, newRange) => {
        setAgeRange(newRange);
    };

    const handleOrderChange = (event) => {
        setOrder(event.target.value);
    };

    function agetext(age) {
        return `${age} years old`;
    }

    const onSubscribe = () => props.history.push('/premium');

    const onSearchTrigger = () => searchRef.current.scrollIntoView({ behavior: 'smooth' });

    function scrollToTargetAdjusted() {
        var headerOffset = document.querySelector('#header').clientHeight;
        var elementPosition = searchRef.current?.getBoundingClientRect().top;
        var offsetPosition = window.scrollY + elementPosition - headerOffset;
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
        });
    }

    const handleChange = async (event, value) => {
        loadPets(value);
        scrollToTargetAdjusted();
    };

    return (
        <div>
            {showPremiumBanner(loggedInUser) ? <PremiumBanner /> : null}
            <Grid container direction="row" justify="center">
                <Grid container spacing={3} xs={6} justify="center" alignItems="flex-end" direction="column">
                    <Grid item justify="flex-start" alignItems="center">
                        <Typography style={{ fontSize: 24 }}>Find the best partner for your pet</Typography>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" style={{ marginRight: 20 }} onClick={onSearchTrigger}>
                            Search for a pet
                        </Button>
                        <Button variant="contained" color="primary" onClick={onSubscribe}>
                            Subscribe
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={6} justify="flex-end" alignItems="center">
                    <div className={classes.homeLogo}>
                        <img alt="home" src={HomeLogo} style={{ width: '25vw', height: 'auto' }} />
                    </div>
                </Grid>
            </Grid>
            <Grid container direction="row" ref={searchRef} justify="center" alignItems="center">
                <Grid item>
                    <FormControl className={classes.formControl} variant="outlined" size="small">
                        <InputLabel id="species-select-label">Species</InputLabel>
                        <Select labelId="species-select-label" id="species-select" value={chosenSpecies} onChange={handleSpeciesChange} label="Species">
                            {Object.keys(breeds).map((oneSpecies) => (
                                <MenuItem key={oneSpecies} value={oneSpecies}>
                                    {oneSpecies}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl className={classes.formControl} variant="outlined" size="small">
                        <InputLabel id="sex-select-label">Sex</InputLabel>
                        <Select labelId="sex-select-label" id="sex-select" value={sex} onChange={handleSexChange} label="Sex">
                            {sexes.map((sex) => (
                                <MenuItem key={sex} value={sex}>
                                    {sex}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl className={classes.formControl} variant="outlined" size="small">
                        <InputLabel id="breed-select-label">Breed</InputLabel>
                        <Select labelId="breed-select-label" id="breed-select" value={breed} onChange={handleBreedChange} label="Breed">
                            {(breeds[chosenSpecies] ?? []).map((breed) => (
                                <MenuItem key={breed} value={breed}>
                                    {breed}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl className={classes.formControl} variant="outlined" size="small">
                        <InputLabel id="breed-select-label">Sort by</InputLabel>
                        <Select labelId="breed-select-label" id="sort-select" value={order} onChange={handleOrderChange} label="Sort by">
                            {orders.map((order) => (
                                <MenuItem key={order} value={order}>
                                    {order}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <div className={classes.ageSlider}>
                        <Typography>Age Range</Typography>
                        <Slider
                            value={ageRange}
                            onChange={handleAgeRangeChange}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            getAriaValueText={agetext}
                            min={0.5}
                            max={10}
                            marks={ageMarks}
                            className={classes.darkSlider}
                        />
                    </div>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="default" className={classes.button} onClick={loadPets}>
                        Apply
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="default" className={classes.button} onClick={resetFilters}>
                        Reset filters
                    </Button>
                </Grid>
            </Grid>
            <SearchResults pets={pets} order={order} />
            {totalPages ? (
                <Box my={2} display="flex" justifyContent="center">
                    <Pagination count={totalPages} variant="outlined" shape="rounded" onChange={handleChange} />
                </Box>
            ) : null}
        </div>
    );
}

export default connect()(withRouter(SearchView));
