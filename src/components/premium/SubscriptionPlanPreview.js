import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const payments = [
    { description: '4.99€ for 1 month', plan: '1mo', price: '4.99' },
    { description: '12,99€ for 3 months', plan: '3mo', price: '12.99' },
    { description: '22,99€ for 6 months', plan: '6mo', price: '22.99' },
    { description: '34,99€ for 1 year', plan: '1yr', price: '34.99' },
];

/**
 * Small preview for the subscription plan
 * @param {props} props
 */
const SubscriptionPlanPreview = ({ user }) => {
    const classes = useStyles();

    const getPaymentPlanDescription = () => {
        const planResult = payments.filter((item) => item.plan === user.paymentPlan);
        return planResult[0].description;
    };

    return (
        <Grid item xs={12} className={classes.root}>
            {user.subscriptionPlan === 'premium' ? (
                <Card className={classes.premium}>
                    <CardContent className={classes.card}>
                        <Typography variant="h6" className={classes.labelPremium}>
                            Premium
                        </Typography>
                        <Typography className={classes.labelPremium}>{getPaymentPlanDescription()}</Typography>
                    </CardContent>
                </Card>
            ) : (
                <Card className={classes.free}>
                    <CardContent className={classes.card}>
                        <Typography variant="h6" className={classes.labelFree}>
                            Free
                        </Typography>
                    </CardContent>
                </Card>
            )}
        </Grid>
    );
};

const useStyles = makeStyles((theme) => ({
    premium: {
        minWidth: 250,
        borderRadius: 25,
        background: theme.palette.primary.main,
        boxShadow: '0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05)',
        border: `2px solid #3E4059`,
    },
    free: {
        minWidth: 250,
        borderRadius: '60px',
        background: '#E9E8E7',
        boxShadow: '0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05)',
        transition: '.3s transform cubic-bezier(.155,1.105,.295,1.12),.3s box-shadow,.3s -webkit-transform cubic-bezier(.155,1.105,.295,1.12)',
        cursor: 'pointer',
        border: `1px solid #EAE8E8`,
        ':hover&': {
            transform: 'scale(1.05)',
            boxShadow: '0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06)',
        },
    },
    root: {
        maxWidth: 345,
        marginTop: 15,
    },
    card: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    },
    labelPremium: {
        color: 'white',
        fontWeight: 'lighter',
    },
    labelFree: {
        color: 'black',
        fontWeight: 'lighter',
        fontSize: 20,
    },
}));

export default SubscriptionPlanPreview;
