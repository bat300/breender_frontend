import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Button, TextField, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    usersignUpRoot: {
        margin: 'auto',
    },
    signUpPaper: {
        width: '1000px',
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

/**
 * For register new users
 * @param {props} props
 */
function SignUpComponent(props) {
    const classes = useStyles();

    const saveAndContinue = (e) => {
        e.preventDefault();
        props.nextStep();
    };

    const [registerError, setRegisterError] = React.useState('');

    const values = props.values;

    let options = null;

    const onRegister = (e) => {
        e.preventDefault();
        props.onRegister(values.email, values.username, values.password, values.city, values.isAdmin, values.subscriptionPlan);
    };

    const onNext = (e) => {
        // e.preventDefault();
        // props.history.push({pathname: '/register', state: user});
    };

    const onBlurPassword = (e) => {
        if (values.password !== '' && values.password2 !== '') {
            if (values.password !== values.password2) {
                setRegisterError('Passwords do not match.');
            } else {
                setRegisterError('');
            }
        }
    };

    return (
        <div className={classes.usersignUpRoot}>
            <Paper className={classes.signUpPaper} component="form">
                <div className={classes.signUpRow}>
                    <Typography variant="h4" align="center">
                        Payment Information
                    </Typography>
                </div>
                <div className={classes.signUpRow}>
                    <TextField required id="name" label="Name on a card" fullWidth />
                </div>
                <div className={classes.signUpRow}>
                    <TextField required id="cardNumber" label="Card number" fullWidth autoComplete="cc-number" />
                </div>
                <div className={classes.signUpRow}>
                    <TextField required id="expDate" label="Expiry date" fullWidth autoComplete="cc-exp" />
                </div>
                <div className={classes.signUpRow}>
                    <TextField required id="cvv" label="CVV" helperText="Last three digits on signature strip" fullWidth autoComplete="cc-csc" />
                </div>
                {registerError !== '' ? (
                    <div className={classes.signUpRow}>
                        <Typography color="error">{registerError}</Typography>
                    </div>
                ) : null}
                <div className={classes.signUpRow + ' ' + classes.signUpButtons}>
                    <Button className={classes.signUpButton} onClick={props.prevStep}>
                        Back
                    </Button>
                    <Button className={classes.signUpButton} variant="contained" color="primary" type="submit" onClick={onRegister}>
                        Submit
                    </Button>
                </div>
            </Paper>
        </div>
    );
}

export default SignUpComponent;
