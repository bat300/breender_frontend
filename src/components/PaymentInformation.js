import React, {useEffect }from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, FormControl, RadioGroup, FormControlLabel, Radio, Typography } from '@material-ui/core';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { connect } from 'react-redux';
import NotificationService from 'services/NotificationService';
import { Button } from 'antd';

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
 * For payment info and registering a new user
 * @param {props} props
 */
function PaymentInformationComponent(props) {
    const classes = useStyles();

    const options = {
        'client-id': 'AU51gVXV29PQQgKgUCipVcv_d6ZEVCHUJH0AwBCBb3ey5faoUa-NdJ8eqWdl-aZysrDrCmf3Dy3EPsdX',
        locale: 'en_US', //set default language to english
        currency: 'EUR',
        intent: 'subscription',
        vault: true,
    };

    const values = props.values;

    const [requestSent, setRequestSent] = React.useState(false);

    const subscribe = (data, actions) => {
        return actions.subscription.create({
            plan_id: props.values.chosenPayment, // Creates the subscription
        });
    }

    const onError = (err) => {
        NotificationService.notify('error', 'Error', 'There was an error in paypal payment. Plwase try again.');
    }

    function onRegister() {
        const paymentPlan = props.payments.find( x => x.plan_id === props.values.chosenPayment);
        const paymentMethod = {
            type: 'paypal',
            details: paymentPlan.price,
        };
        props.onRegister(values.email, values.username, values.password, values.city, values.province, values.isAdmin, values.subscriptionPlan, paymentPlan.renewalFrequency, paymentMethod);
    }

    return (
        <div className={classes.usersignUpRoot} align="center">
            <Paper className={classes.signUpPaper} component="form">
                <div className={classes.signUpRow}>
                    <Typography variant="h4">
                        Choose payment plan
                    </Typography>
                </div>
                <div className={classes.signUpRow}>
                    <FormControl component="fieldset">
                        <RadioGroup aria-label="plan" value={props.values.chosenPayment} onChange={(e) => props.handleChange('chosenPayment', e)} id="payment">
                            {props.payments.map((payment) => (
                                <FormControlLabel value={payment.plan_id} control={<Radio />} label={payment.price} key={payment.plan_id}/>
                            ))}
                        </RadioGroup>
                    </FormControl>
                </div>
                <div className={classes.signUpRow}>
                    <PayPalScriptProvider options={options}>
                        <PayPalButtons forceReRender={[props.values.chosenPayment]} //rerender paypal button every time payment plan changes: ensures that plan_id is correct
                            style={{ layout: 'horizontal' }}
                            createSubscription={subscribe}
                            onApprove={async (data, actions) => {
                                onRegister();
                            }}
                            onError={onError}
                        />
                    </PayPalScriptProvider>
                </div>
            </Paper>
        </div>
    );
}

export default connect()(PaymentInformationComponent);
