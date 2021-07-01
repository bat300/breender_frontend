import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { InputLabel, MenuItem, Select, Grid, Paper, Button, TextField, Typography, FormControlLabel, Checkbox } from '@material-ui/core';
import { checkIfUserExists } from '../redux/actions';
import { connect, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    usersignUpRoot: {
        margin: 'auto',
    },
    signUpPaper: {
        width: '500px',
        padding: theme.spacing(2),
    },
    signUpRow: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        '&:last-child': {
            paddingBottom: theme.spacing(0),
        },
        '&:first-child': {
            paddingTop: theme.spacing(0),
        },
    },
    signUpButtons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    signUpButton: {
        marginLeft: theme.spacing(1),
    },
}));

const provincesAndCities = {
    bavaria: ['Munich', 'Nuremberg', 'Augsburg', 'Regensburg', 'Ingolstadt', 'Würzburg', 'Other'],
    'lower-saxony': ['Hanover', 'Braunschweig', 'Oldenburg', 'Osnabrück', 'Wolfsburg', 'Göttingen', 'Other'],
    'baden-wuerttemberg': ['Stuttgart', 'Karlsruhe', 'Mannheim', 'Freiburg im Breisgau', 'Heidelberg', 'Ulm', 'Other'],
    'north-rhine-westphalia': ['Cologne', 'Düsseldorf', 'Dortmund', 'Essen', 'Duisburg', 'Bochum', 'Other'],
};

/**
 * For register new users
 * @param {props} props
 */
function SignUpComponent(props) {
    const classes = useStyles();
    const values = props.values;
    const errors = props.errors;
    const [passwordError, setPasswordError] = React.useState('');
    const [newErrorMessage, setErrorMessage] = React.useState(false); //set to false when loading the page in order to get valid error message and not the one from previous request
    const userExists = useSelector((state) => state.userExists);

    const saveAndContinue = (e) => {
        e.preventDefault();
        checkUser();
    };

    function checkUser() {
        emailIsValid(values.email) ? props.dispatch(checkIfUserExists(values.email, values.username)) : props.handleChange('emailError', 'Invalid email format.');
        setErrorMessage(true);
    }

    useEffect(() => {
        if (userExists.error) {
            if (newErrorMessage) {
                if (userExists.error.type === 'username') {
                    props.handleChange('usernameError', userExists.error.message);
                } else {
                    props.handleChange('emailError', userExists.error.message);
                }
            }
        } else {
            if (newErrorMessage) {
                props.nextStep();
            }
        }
    }, [userExists]);

    let options = null;

    if (values.province) {
        options = provincesAndCities[values.province].map((elem) => (
            <MenuItem key={elem} value={elem}>
                {elem}
            </MenuItem>
        ));
    }

    function emailIsValid(email) {
        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
    }

    const onBlurPassword = (e) => {
        if (values.password !== '' && values.password2 !== '') {
            if (values.password !== values.password2) {
                setPasswordError('Passwords do not match.');
            } else {
                setPasswordError('');
            }
        }
    };

    return (
        <div className={classes.usersignUpRoot}>
            <Paper className={classes.signUpPaper} component="form">
                <div className={classes.signUpRow}>
                    <Typography variant="h4" align="center">
                        Welcome to the Breender App!
                    </Typography>
                </div>
                <div className={classes.signUpRow}>
                    <TextField
                        label="Email"
                        fullWidth
                        value={values.email}
                        onChange={(e) => props.handleChange('email', e)}
                        error={errors.emailError !== ''}
                        helperText={errors.emailError !== '' ? errors.emailError : null}
                        type="email"
                    />
                </div>
                <div className={classes.signUpRow}>
                    <TextField
                        label="Username"
                        fullWidth
                        value={values.username}
                        onChange={(e) => props.handleChange('username', e)}
                        error={errors.usernameError !== ''}
                        helperText={errors.usernameError !== '' ? errors.usernameError : null}
                    />
                </div>
                <div className={classes.signUpRow}>
                    <TextField label="Password" fullWidth value={values.password} onChange={(e) => props.handleChange('password', e)} error={passwordError !== ''} type="password" />
                </div>
                <div className={classes.signUpRow}>
                    <TextField
                        label="Repeat Password"
                        fullWidth
                        value={values.password2}
                        onChange={(e) => props.handleChange('password2', e)}
                        error={passwordError !== ''}
                        onBlur={onBlurPassword}
                        type="password"
                    />
                </div>
                <Grid container spacing={2} style={{ paddingTop: 20 }}>
                    <Grid item xs={6}>
                        <div className={classes.signUpRow}>
                            <InputLabel>State/Province</InputLabel>
                            <Select label="State/Province" value={values.province} onChange={(e) => props.handleChange('province', e)}>
                                <MenuItem value={'bavaria'}>Bavaria</MenuItem>
                                <MenuItem value={'lower-saxony'}>Lower Saxony</MenuItem>
                                <MenuItem value={'baden-wuerttemberg'}>Baden-Württemberg</MenuItem>
                                <MenuItem value={'north-rhine-westphalia'}>North Rhine-Westphalia</MenuItem>
                            </Select>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className={classes.signUpRow}>
                            <InputLabel>City</InputLabel>
                            <Select label="City" value={values.city} onChange={(e) => props.handleChange('city', e)}>
                                {options}
                            </Select>
                        </div>
                    </Grid>
                </Grid>
                <div className={classes.signUpRow}>
                    <FormControlLabel control={<Checkbox checked={values.isAdmin} onChange={(e) => props.handleChange('isAdmin', e)} color="primary" />} label="Is Admin" />
                </div>
                {passwordError !== '' ? (
                    <div className={classes.signUpRow}>
                        <Typography color="error">{passwordError}</Typography>
                    </div>
                ) : null}
                <div className={classes.signUpRow + ' ' + classes.signUpButtons}>
                    <Button className={classes.signUpButton} onClick={props.onCancel}>
                        Cancel
                    </Button>
                    <Button
                        className={classes.signUpButton}
                        variant="contained"
                        color="primary"
                        disabled={
                            values.email === '' ||
                            errors.emailError !== '' ||
                            values.username === '' ||
                            errors.usernameError !== '' ||
                            values.password === '' ||
                            values.password2 === '' ||
                            values.password !== values.password2 ||
                            values.province === '' ||
                            values.city === '' ||
                            passwordError !== ''
                        }
                        onClick={saveAndContinue}
                    >
                        Next
                    </Button>
                </div>
            </Paper>
        </div>
    );
}

export default connect()(SignUpComponent);
