import 'date-fns';
import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { FormControl, Grid, Typography, InputLabel, InputAdornment, MenuItem, Select, TextField, Paper } from '@material-ui/core';
import { dogBreeds, catBreeds, horseBreeds } from 'helper/data/breeds';

const PetInformationForm = (props) => {
    const classes = useStyles();
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');
    const [sex, setSex] = useState('');
    const [birthDate, setBirthDate] = useState(new Date());
    const [species, setSpecies] = useState('');
    const [breed, setBreed] = useState('');
    const [price, setPrice] = useState(0);

    // handle variable changes
    const handleNameChange = (name) => setName(name.target.value);
    const handleNicknameChange = (nickname) => setNickname(nickname.target.value);
    const handleSexChange = (sex) => setSex(sex.target.value);
    const handlePriceChange = (price) => setPrice(price.target.value);

    const handleDateChange = (date) => setBirthDate(date);

    const handleSpeciesChange = (species) => setSpecies(species.target.value);
    const handleBreedChange = (breed) => setBreed(breed.target.value);

    // sort breeds data
    const sortedDogBreeds = dogBreeds.sort((a, b) => a.localeCompare(b));
    const sortedCatBreeds = catBreeds.sort((a, b) => a.localeCompare(b));
    const sortedHorseBreeds = horseBreeds.sort((a, b) => a.localeCompare(b));

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <form className={classes.layout} noValidate autoComplete="off">
                <Paper className={classes.paper}>
                    <Typography className={classes.label} variant="h5" align="center">
                        Information about your pet
                    </Typography>
                    <React.Fragment>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField size="small" required id="name" name="name" value={name} onChange={handleNameChange} label="Official Name" variant="outlined" fullWidth />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField required size="small" id="nickname" name="nickname" value={nickname} onChange={handleNicknameChange} label="Nickname" variant="outlined" fullWidth />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <KeyboardDatePicker
                                    required
                                    disableToolbar
                                    id="date-picker"
                                    inputVariant="outlined"
                                    size="small"
                                    variant="dialog"
                                    format="dd.MM.yyyy"
                                    margin="none"
                                    label="Birth Date"
                                    value={birthDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl required variant="outlined" size="small" fullWidth>
                                    <InputLabel id="sex-label">Sex</InputLabel>
                                    <Select label="Sex" id="sex" value={sex} onChange={handleSexChange}>
                                        <MenuItem value={'female'}>female</MenuItem>
                                        <MenuItem value={'male'}>male</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl required variant="outlined" size="small" fullWidth>
                                    <InputLabel id="species-label">Species</InputLabel>
                                    <Select label="Species" id="species" value={species} onChange={handleSpeciesChange}>
                                        <MenuItem value={'dog'}>Dog</MenuItem>
                                        <MenuItem value={'cat'}>Cat</MenuItem>
                                        <MenuItem value={'horse'}>Horse</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl required variant="outlined" size="small" fullWidth>
                                    <InputLabel id="breed-label">Breed</InputLabel>
                                    <Select label="Breed" id="breed" value={breed} onChange={handleBreedChange}>
                                        {species === 'dog'
                                            ? sortedDogBreeds.map((breed) => {
                                                  return <MenuItem value={breed}>{breed}</MenuItem>;
                                              })
                                            : species === 'cat'
                                            ? sortedCatBreeds.map((breed) => {
                                                  return <MenuItem value={breed}>{breed}</MenuItem>;
                                              })
                                            : species === 'horse'
                                            ? sortedHorseBreeds.map((breed) => {
                                                  return <MenuItem value={breed}>{breed}</MenuItem>;
                                              })
                                            : null}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    size="small"
                                    id="price"
                                    name="price"
                                    value={price}
                                    onChange={handlePriceChange}
                                    label="Price"
                                    variant="outlined"
                                    type="number"
                                    error={price < 0}
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">€</InputAdornment>,
                                        inputProps: {
                                            min: 0,
                                        },
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </React.Fragment>
                </Paper>
            </form>
        </MuiPickersUtilsProvider>
    );
};

const useStyles = makeStyles((theme) => ({
    layout: {
        width: 'auto',
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 700,
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    label: {
        marginBottom: theme.spacing(5),
    },
}));

export default PetInformationForm;
