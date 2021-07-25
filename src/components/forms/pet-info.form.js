import 'date-fns';
import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { FormControl, Grid, InputLabel, InputAdornment, MenuItem, Select, TextField, Paper, Divider, FormHelperText, Typography } from '@material-ui/core';
import { breeds } from 'helper/data/breeds';
import DocumentsUpload from '../upload/documents.upload';
import CompetitionsComponent from '../competitions';

// define types for error handling
const PetFormInputs = {
    name: 'name',
    sex: 'sex',
    species: 'species',
    breed: 'breed',
};

const PetInformationForm = ({ nameProp, nicknameProp, sexProp, breedProp, speciesProp, priceProp, birthDateProp, ...props }) => {
    const classes = useStyles();
    const { name, setName } = nameProp;
    const { nickname, setNickname } = nicknameProp;
    const { sex, setSex } = sexProp;
    const { breed, setBreed } = breedProp;
    const { species, setSpecies } = speciesProp;
    const { price, setPrice } = priceProp;
    const { birthDate, setBirthDate } = birthDateProp;
    const [errors, setErrors] = useState({ name: false, nickname: false, sex: false, species: false, breed: false });
    const validationErrors = {
        name: 'Name is required',
        nickname: 'Nickname is required',
        sex: 'Sex is required',
        species: 'Species is required',
        breed: 'Breed is required',
    };

    // validate fields
    const validate = (type, value) => {
        let temp = { ...errors };
        if (value === '') {
            temp[type] = true;
        } else {
            temp[type] = false;
        }
        setErrors({ ...temp });
    };

    // handle variable changes
    const handleNameChange = (e) => {
        validate(PetFormInputs.name, e.target.value);
        setName(e.target.value);
    };
    const handleNicknameChange = (e) => setNickname(e.target.value);

    const handleSexChange = (e) => {
        validate(PetFormInputs.sex, e.target.value);
        setSex(e.target.value);
    };
    const handlePriceChange = (e) => setPrice(e.target.value);

    const handleDateChange = (date) => setBirthDate(date);

    const handleSpeciesChange = (e) => {
        validate(PetFormInputs.species, e.target.value);
        setSpecies(e.target.value);
    };
    const handleBreedChange = (e) => {
        validate(PetFormInputs.breed, e.target.value);
        setBreed(e.target.value);
    };

    // sort breeds data
    const sortedDogBreeds = breeds.dog.sort((a, b) => a.localeCompare(b));
    const sortedCatBreeds = breeds.cat.sort((a, b) => a.localeCompare(b));
    const sortedHorseBreeds = breeds.horse.sort((a, b) => a.localeCompare(b));

    return (
        <div className={classes.layout}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <form autoComplete="off">
                    <Paper className={classes.paper}>
                        <Typography variant="h5" className={classes.title}>Information about your pet</Typography>
                        <React.Fragment>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        size="small"
                                        required
                                        id="name"
                                        name="name"
                                        value={name}
                                        onChange={handleNameChange}
                                        onBlur={handleNameChange}
                                        label="Official Name"
                                        variant="outlined"
                                        fullWidth
                                        {...(errors[PetFormInputs.name] && { error: true, helperText: validationErrors[PetFormInputs.name] })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        size="small"
                                        id="nickname"
                                        name="nickname"
                                        value={nickname}
                                        onChange={handleNicknameChange}
                                        onBlur={handleNicknameChange}
                                        label="Nickname"
                                        variant="outlined"
                                        fullWidth
                                        {...(errors[PetFormInputs.nickname] && { error: true, helperText: validationErrors[PetFormInputs.nickname] })}
                                    />
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
                                        maxDate={new Date()}
                                        value={birthDate}
                                        onChange={handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl required variant="outlined" size="small" fullWidth error={errors[PetFormInputs.sex]}>
                                        <InputLabel id="sex-label">Sex</InputLabel>
                                        <Select label="Sex" id="sex" value={sex} onChange={handleSexChange} onBlur={handleSexChange}>
                                            <MenuItem value={'female'}>female</MenuItem>
                                            <MenuItem value={'male'}>male</MenuItem>
                                        </Select>
                                        <FormHelperText>{errors[PetFormInputs.sex] && validationErrors[PetFormInputs.sex]}</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl required variant="outlined" size="small" fullWidth error={errors[PetFormInputs.species]}>
                                        <InputLabel id="species-label">Species</InputLabel>
                                        <Select label="Species" id="species" value={species} onChange={handleSpeciesChange} onBlur={handleSpeciesChange}>
                                            {Object.keys(breeds).map((value) => {
                                                return <MenuItem key={value} value={value}>{value}</MenuItem>
                                            })}
                                        </Select>
                                        <FormHelperText>{errors[PetFormInputs.species] && validationErrors[PetFormInputs.species]}</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl required variant="outlined" size="small" fullWidth error={errors[PetFormInputs.breed]}>
                                        <InputLabel id="breed-label">Breed</InputLabel>
                                        <Select label="Breed" id="breed" value={breed} onChange={handleBreedChange} onBlur={handleBreedChange}>
                                            {species === 'dog'
                                                ? sortedDogBreeds.map((breed) => {
                                                    return <MenuItem key={breed} value={breed}>{breed}</MenuItem>;
                                                })
                                                : species === 'cat'
                                                    ? sortedCatBreeds.map((breed) => {
                                                        return <MenuItem key={breed} value={breed}>{breed}</MenuItem>;
                                                    })
                                                    : species === 'horse'
                                                        ? sortedHorseBreeds.map((breed) => {
                                                            return <MenuItem key={breed} value={breed}>{breed}</MenuItem>;
                                                        })
                                                        : null}
                                        </Select>
                                        <FormHelperText>{errors[PetFormInputs.breed] && validationErrors[PetFormInputs.breed]}</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <CompetitionsComponent mode={props.mode} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider />
                                    <Grid>
                                        <label className={classes.label}>Upload Documents (birth certificates, etc.)</label>
                                        <label className={classes.label2}>Please make sure that the documents have a right name</label>
                                    </Grid>
                                    <DocumentsUpload mode={props.mode} />
                                   
                                </Grid>
                                
                                <Grid item xs={12}>
                                    <TextField
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
        borderRadius: 25,
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: 40,
        [theme.breakpoints.down('sm')]: {
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3),
            padding: theme.spacing(2),
        },
    },
    label: {
        display: 'flex',
        fontSize: 20,
        fontWeight: 300,
        marginBottom: 15,
        marginTop: 15,
        fontFamily: "'Open Sans', sans-serif"
    },
    label2: theme.typography.body1,
    title: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        marginTop: 15,
    },
}));

export default PetInformationForm;
