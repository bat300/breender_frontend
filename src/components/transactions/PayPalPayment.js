import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { makeStyles } from '@material-ui/core';

const options = {
    'client-id': 'AU51gVXV29PQQgKgUCipVcv_d6ZEVCHUJH0AwBCBb3ey5faoUa-NdJ8eqWdl-aZysrDrCmf3Dy3EPsdX',
    currency: 'EUR',
};

const PayPalPayment = ({ amount, onApprove, onError }) => {
    const classes = useStyles();

    return (
        <div className={classes.row}>
            <PayPalScriptProvider options={options}>
                <PayPalButtons
                    style={{ layout: 'horizontal', height: 40 }}
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    description: 'Breender Payment',
                                    amount: {
                                        value: amount,
                                    },
                                },
                            ],
                        });
                    }}
                    onApprove={async (data, actions) => {
                        actions.order.capture().then((details) => {
                            onApprove();
                        });
                    }}
                    onError={onError}
                />
            </PayPalScriptProvider>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    row: {
        maxWidth: 150,
        paddingBottom: theme.spacing(1),
        '&:last-child': {
            paddingBottom: theme.spacing(0),
        },
        '&:first-child': {
            paddingTop: theme.spacing(0),
        },
    },
}));

export default PayPalPayment;
