import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, FormControl, RadioGroup, FormControlLabel, Radio, Typography, Button } from '@material-ui/core';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { connect } from 'react-redux';
import NotificationService from 'services/NotificationService';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
    },
    paper: {
        width: '1000px',
        height: '425px',
        padding: theme.spacing(2),
    },
    row: {
        paddingTop: theme.spacing(1.5),
        paddingBottom: theme.spacing(1),
        '&:last-child': {
            paddingBottom: theme.spacing(0),
        },
        '&:first-child': {
            paddingTop: theme.spacing(0),
        },
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginLeft: theme.spacing(1),
    }
}));

/**
 * For payment info and registering a new user
 * @param {props} props
 */
function PaymentInformationComponent(props) {
    const classes = useStyles();
    const [disabled, setDisabled] = React.useState(false);

    const options = {
        'client-id': 'AU51gVXV29PQQgKgUCipVcv_d6ZEVCHUJH0AwBCBb3ey5faoUa-NdJ8eqWdl-aZysrDrCmf3Dy3EPsdX',
        currency: 'EUR',
    };

    const values = props.values;

    const onError = (err) => {
        NotificationService.notify('error', 'Error', 'There was an error in PayPal payment. Please try again.');
    };

    function onSuccess(paymentMethod) {
        const paymentPlan = props.payments.find((x) => x.price === props.values.chosenPayment);
        props.user.user
            ? props.onSuccess(paymentPlan.plan, paymentMethod)
            : props.onSuccess(values.email, values.username, values.password, values.city, values.province, values.isAdmin, values.subscriptionPlan, paymentPlan.plan, paymentMethod);
    }

    return (
        <div className={classes.root} align="center">
            <Paper className={classes.paper} component="form">
                <div className={classes.row}>
                    <Typography variant="h4">Choose payment plan</Typography>
                </div>
                <div className={classes.row}>
                    <FormControl component="fieldset">
                        <RadioGroup aria-label="plan" value={props.values.chosenPayment} onChange={(e) => props.handleChange('chosenPayment', e)} id="payment">
                            {props.payments.map((payment) => (
                                <FormControlLabel value={payment.price} control={<Radio style={{color: "#D37F65"}}/>} label={payment.description} key={payment.price} className={classes.radio}/>
                            ))}
                        </RadioGroup>
                    </FormControl>
                </div>
                <div className={classes.row}>
                    <PayPalScriptProvider options={options}>
                        <PayPalButtons
                            disabled={disabled}
                            forceReRender={[props.values.chosenPayment]}
                            style={{ layout: 'horizontal' }} //rerender paypal button every time payment plan changes: ensures that plan_id is correct
                            createOrder={(data, actions) => {
                                setDisabled(true);
                                return actions.order.create({
                                    purchase_units: [
                                        {
                                            description: 'Breender Premium Subscription',
                                            amount: {
                                                value: props.values.chosenPayment,
                                            },
                                        },
                                    ],
                                });
                            }}
                            onApprove={async (data, actions) => {
                                actions.order.capture().then((details) => {
                                    const paymentMethod = {
                                        type: 'PayPal',
                                        email: details.payer.email_address,
                                    };
                                    onSuccess(paymentMethod);
                                });
                            }}
                            onError={onError}
                        />
                    </PayPalScriptProvider>
                </div>
                <div className={classes.row + ' ' + classes.buttons}>
                    <Button className={classes.button} onClick={props.prevStep} disabled={disabled}>
                        Back
                    </Button>
                </div>
            </Paper>
        </div>
    );
}

export default connect()(PaymentInformationComponent);
