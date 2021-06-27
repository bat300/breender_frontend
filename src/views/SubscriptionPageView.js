import React from 'react';
import { connect, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SubscriptionPlanComponent from '../components/premium/SubscriptionPlanComponent';

const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    premiumDescription: {
        padding: theme.spacing(8, 0, 6),
    },

}));

const plans = [
    {
        id: 'free',
        title: 'Free',
        price: '0.00',
        included: ['View all applications', 'Phone & Email support'],
        excluded: ['Contact pet owners', ' Pay no transaction fees', 'Verify pet documents', 'Higher position in results', 'No advertisement banners'],
        buttonText: 'Sign up for free',
        buttonVariant: 'contained',
    },
    {
        id: 'premium',
        title: 'Premium',
        subheader: 'Most popular',
        price: '9.00',
        included: ['View all applications', 'Phone & Email support', 'Contact pet owners', 'Pay no transaction fees', 'Verify pet documents', 'Higher position in results', 'No advertisement banners'],
        excluded: [],
        buttonText: 'Get started',
        buttonVariant: 'contained',
    },
    
];

function SubscriptionPageView(props) {
    const classes = useStyles();

    const onSignUp = () => {
        props.history.push("/register");
    };

    return (
        <Container>
            <Container maxWidth="sm" component="main" className={classes.premiumDescription}>
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Get Access to All Features!
                </Typography>
                <Typography variant="h5" align="center" color="textSecondary" component="p">
             Basic product or service is provided free of charge, but money (a premium) is charged for additional features, services, or virtual (online) or physical (offline) goods that expand the functionality of the free version.
                </Typography>
            </Container>
            <Container maxWidth="md" component="main">
                <Grid container spacing={5} alignItems="flex-end">
                    <SubscriptionPlanComponent plans={plans} onClick={onSignUp} />
                </Grid>
            </Container>
        </Container>
    );
}
export default connect()(SubscriptionPageView);
