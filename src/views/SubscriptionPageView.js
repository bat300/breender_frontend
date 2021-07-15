import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SubscriptionPlanComponent from '../components/premium/SubscriptionPlanComponent';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    premiumDescription: {
        padding: theme.spacing(8, 0, 6),
    },
}));

function SubscriptionPageView(props) {
    const classes = useStyles();


    const subscriptionPlan = '';
    const onSignUp = (v) => {
        //pass subscription plan to sign up page
        props.history.push({pathname:"/register", subscriptionPlan: v});
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
                    <SubscriptionPlanComponent onClick={onSignUp} subscriptionPlan={subscriptionPlan}/>
                </Grid>
            </Container>
        </Container>
    );
}
export default connect()(withRouter(SubscriptionPageView));
