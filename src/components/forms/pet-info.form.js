import 'date-fns';
import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { FormControl, Grid, InputLabel, InputAdornment, MenuItem, Select, TextField, Paper, Divider } from '@material-ui/core';
import { dogBreeds, catBreeds, horseBreeds } from 'helper/data/breeds';
import DocumentsUpload from '../upload/documents.upload';
import CompetitionsComponent from '../competitions';

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
        <div className={classes.layout}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <form autoComplete="off">
                    <Paper className={classes.paper}>
                        <label className={classes.title}>Information about your pet</label>
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
                                    <CompetitionsComponent />
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider />
                                    <Grid>
                                        <label className={classes.label}>Upload Documents</label>
                                    </Grid>
                                    <DocumentsUpload />
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
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    layout: {
        flex: 1,
        width: 'auto',
        maxWidth: 800,
        margin: 10,
    },
    paper: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3),
            padding: theme.spacing(2),
        },
    },
    label: {
        display: 'flex',
        fontSize: 16,
        fontWeight: 500,
        marginBottom: 15,
        marginTop: 15,
    },
    title: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 22,
        fontWeight: 500,
        marginBottom: 15,
        marginTop: 15,
    },
}));

export default PetInformationForm;
