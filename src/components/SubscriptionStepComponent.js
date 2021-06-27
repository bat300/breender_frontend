import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import { Paper, Button, Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import SubscriptionPlanComponent from './premium/SubscriptionPlanComponent';

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
function SubscriptionStepComponent(props) {
    const classes = useStyles();

    const [registerError, setRegisterError] = React.useState('');

    const saveAndContinue = (e) => {
        e.preventDefault();
        props.nextStep();
    };

    const back = (e) => {
        e.preventDefault();
        props.prevStep();
    };

    const values = props.values;

    function onSelect(v) {
        props.handleChange(v);
    }

    return (
        <div className={classes.usersignUpRoot}>
            <Paper className={classes.signUpPaper} component="form">
                <div className={classes.signUpRow}>
                    <Typography variant="h4" align="center">
                        Choose your subscription plan
                    </Typography>
                </div>
                <Container maxWidth="md" component="main">
                    <Grid container spacing={5} alignItems="flex-end">
                        <SubscriptionPlanComponent onClick={onSelect} />
                    </Grid>
                </Container>
                <div className={classes.signUpRow + ' ' + classes.signUpButtons}>
                    <Button className={classes.signUpButton} onClick={back}>
                        back
                    </Button>
                    <Button className={classes.signUpButton} variant="contained" color="primary" onClick={saveAndContinue}>
                        Next
                    </Button>
                </div>
            </Paper>
        </div>
    );
}

export default SubscriptionStepComponent;
