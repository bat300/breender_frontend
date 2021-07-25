import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, Grid, InputLabel, Button, MenuItem, Select, TextField, FormHelperText, Divider, Typography } from '@material-ui/core';
import * as EmailValidator from 'email-validator';
import { Tooltip } from 'antd';

const useStyles = makeStyles((theme) => ({
    layout: {
        flex: 1,
        width: 'auto',
        maxWidth: '80%',
        marginLeft: '10%',
        marginRight: '10%',
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
    typography: {
        margin: theme.spacing(2),
        marginTop: theme.spacing(6),
    },
    divider: {
        margin: theme.spacing(3),
    },
    typographyNotifications: {
        padding: theme.spacing(2),
        margin: 'auto',
    },
}));

// define types for error handling
const UserFormInputs = {
    username: 'username',
    province: 'province',
    city: 'city',
    password: 'password',
    password2: 'password2',
    paymentEmail: 'paymentEmail',
};

const provincesAndCities = {
    bavaria: ['Munich', 'Nuremberg', 'Augsburg', 'Regensburg', 'Ingolstadt', 'Würzburg'],
    'lower-saxony': ['Hanover', 'Braunschweig', 'Oldenburg', 'Osnabrück', 'Wolfsburg', 'Göttingen'],
    'baden-wuerttemberg': ['Stuttgart', 'Karlsruhe', 'Mannheim', 'Freiburg im Breisgau', 'Heidelberg', 'Ulm'],
    'north-rhine-westphalia': ['Cologne', 'Düsseldorf', 'Dortmund', 'Essen', 'Duisburg', 'Bochum'],
};

export default function UserForm({ usernameProp, emailProp, provinceProp, cityProp, passwordProp, password2Prop, paymentMethodProp, disableSaveProp, ...props }) {
    const classes = useStyles();
    const history = useHistory();
    const { username, setUsername } = usernameProp;
    const { email, setEmail } = emailProp;
    const { province, setProvince } = provinceProp;
    const { city, setCity } = cityProp;
    const [errors, setErrors] = useState({ username: false, province: false, city: false, password: false, password2: false, paymentEmail: false });
    const { password, setPassword } = passwordProp;
    const { password2, setPassword2 } = password2Prop;
    const { paymentMethod, setPaymentMethod } = paymentMethodProp;
    const [type, setType] = React.useState('PayPal');
    const { disableSave, setDisableSave } = disableSaveProp;
    var paymentEmail = paymentMethod ? paymentMethod.email : '';

    const validationErrors = {
        username: 'Userame is required',
        province: 'Province is required',
        city: 'City is required',
        password: 'The passwords should be the same',
        password2: 'The passwords should be the same',
        paymentEmail: 'Email is not valid',
    };

    let cityOptions = null;

    if (province) {
        cityOptions = provincesAndCities[province].map((elem) => (
            <MenuItem key={elem} value={elem}>
                {elem}
            </MenuItem>
        ));
    }

    // validate fields
    const validate = (type, value) => {
        let temp = { ...errors };
        if (type !== UserFormInputs.password && type !== UserFormInputs.password2 && value === '') {
            temp[type] = true;
        } else {
            temp[type] = false;
        }

        if (type === UserFormInputs.password2) {
            if (value !== '' && value !== password) {
                temp[type] = true;
                temp[UserFormInputs.password] = true;
            } else {
                temp[type] = false;
                temp[UserFormInputs.password] = false;
            }
        }

        if (type === UserFormInputs.paymentEmail) {
            if (value !== '' && !EmailValidator.validate(value)) {
                temp[type] = true;
            } else {
                temp[type] = false;
            }
        }

        let values = Object.keys(temp).map(function (key) {
            return temp[key];
        });

        if (values.every(element => element === false)) {
            setDisableSave(false);
        } else {
            setDisableSave(true);
        }
        setErrors({ ...temp });
    };

    // handle variable changes
    const handleUsernameChange = (e) => {
        validate(UserFormInputs.username, e.target.value);
        setUsername(e.target.value);
    };
    const handleProvinceChange = (e) => {
        validate(UserFormInputs.province, e.target.value);
        setProvince(e.target.value);
    };
    const handleCityChange = (e) => {
        validate(UserFormInputs.city, e.target.value);
        setCity(e.target.value);
    };

    const handlePasswordChange = (e) => {
        validate(UserFormInputs.password, e.target.value);
        setPassword(e.target.value);
    };

    const handlePassword2Change = (e) => {
        validate(UserFormInputs.password2, e.target.value);
        setPassword2(e.target.value);
    };

    const handleTypeChange = (e) => {
        setType(e.target.value);
    };

    const handlePaymentEmailChange = (e) => {
        validate(UserFormInputs.paymentEmail, e.target.value);
        paymentEmail = e.target.value;
        if (paymentEmail === '') {
            console.log("Email is empty, set payment method to null");
            setPaymentMethod(null);
        } else {
            setPaymentMethod({ type: type, email: e.target.value });
        }
    }

    const handleChangeSubscriptionPlan = (e) => {
        history.push('/premium');
    };


    return (
        <div className={classes.layout}>
            <form autoComplete="off">
                <React.Fragment>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                size="small"
                                required
                                id="username"
                                name="username"
                                value={username}
                                onChange={handleUsernameChange}
                                onBlur={handleUsernameChange}
                                label="Username"
                                variant="outlined"
                                fullWidth
                                {...(errors[UserFormInputs.username] && { error: true, helperText: validationErrors[UserFormInputs.username] })}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                size="small"
                                disabled
                                id="email"
                                name="email"
                                value={email}
                                label="Email"
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl required variant="outlined" size="small" fullWidth error={errors[UserFormInputs.province]}>
                                <InputLabel>State/Province</InputLabel>
                                <Select label="State/Province" value={province} onChange={handleProvinceChange}>
                                    <MenuItem value={'bavaria'}>Bavaria</MenuItem>
                                    <MenuItem value={'lower-saxony'}>Lower Saxony</MenuItem>
                                    <MenuItem value={'baden-wuerttemberg'}>Baden-Württemberg</MenuItem>
                                    <MenuItem value={'north-rhine-westphalia'}>North Rhine-Westphalia</MenuItem>
                                </Select>
                                <FormHelperText>{errors[UserFormInputs.province] && validationErrors[UserFormInputs.province]}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl required variant="outlined" size="small" fullWidth error={errors[UserFormInputs.city]}>
                                <InputLabel>City</InputLabel>
                                <Select label="City" value={city} onChange={handleCityChange}>
                                    {cityOptions}
                                </Select>
                                <FormHelperText>{errors[UserFormInputs.city] && validationErrors[UserFormInputs.city]}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl required variant="outlined" size="small" fullWidth error={errors[UserFormInputs.province]}>
                                <TextField
                                    size="small"
                                    label="New Password"
                                    fullWidth
                                    value={password}
                                    onChange={handlePasswordChange}
                                    type="password"
                                    variant="outlined"
                                    {...(errors[UserFormInputs.password] && { error: true, helperText: validationErrors[UserFormInputs.password] })} />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl required variant="outlined" size="small" fullWidth error={errors[UserFormInputs.city]}>
                                <TextField
                                    size="small"
                                    label="Repeat new Password"
                                    fullWidth
                                    value={password2}
                                    onChange={handlePassword2Change}
                                    type="password"
                                    variant="outlined"
                                    {...(errors[UserFormInputs.password2] && { error: true, helperText: validationErrors[UserFormInputs.password2] })} />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                size="small"
                                disabled
                                id="plan"
                                name="plan"
                                value={props.subscriptionPlan === 'premium' ? "Premium" : "Basic"}
                                label="Pricing"
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {props.subscriptionPlan === 'premium' ?
                                <Tooltip trigger="hover" placement="top" title={"After your premium subscription ends your plan will be automatically switched to free."}>
                                    <div>
                                        <Button style={{ margin: '0 auto', display: "flex", pointerEvents: 'none' }} variant="contained" color="secondary" onClick={handleChangeSubscriptionPlan} disabled={props.subscriptionPlan === 'premium'}>
                                            Adjust the plan
                                        </Button>
                                    </div>
                                </Tooltip>
                                : <Button style={{ margin: '0 auto', display: "flex" }} variant="contained" color="secondary" onClick={handleChangeSubscriptionPlan} disabled={props.subscriptionPlan === 'premium'}>
                                    Adjust the plan
                                </Button>}
                        </Grid>
                    </Grid>
                    <Divider variant="middle" className={classes.divider} />
                    <Typography className={classes.typography} variant="h6" align="center" style={{ fontWeight: 600 }}>
                        Payment method
                    </Typography>
                    <Grid container direction="row" spacing={3} item>
                        <Grid item xs={12} sm={6}>
                            <FormControl required variant="outlined" size="small" fullWidth>
                                <InputLabel>Payment type</InputLabel>
                                <Select label="Payment type" value={type} onChange={handleTypeChange}>
                                    <MenuItem value={'PayPal'}>PayPal</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl required variant="outlined" size="small" fullWidth error={errors[UserFormInputs.paymentEmail]}>
                                <TextField
                                    size="small"
                                    label="Payment Email"
                                    fullWidth value={paymentEmail}
                                    onChange={handlePaymentEmailChange}
                                    type="paymentEmail"
                                    variant="outlined"
                                    {...(errors[UserFormInputs.paymentEmail] && { error: true, helperText: validationErrors[UserFormInputs.paymentEmail] })} />
                            </FormControl>
                        </Grid>
                    </Grid>
                </React.Fragment>
            </form>
        </div>
    );
}