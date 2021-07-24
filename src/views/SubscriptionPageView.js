import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Paper } from '@material-ui/core';
import SubscriptionPlanComponent from '../components/premium/SubscriptionPlanComponent';
import { withRouter } from 'react-router-dom';
import { getUsersInfo } from 'redux/actions';
import pets from '../images/pets.png';

const useStyles = makeStyles((theme) => ({
    premiumDescription: {
        padding: theme.spacing(8, 0, 6),
    },
    title: theme.typography.h3,
    description: theme.typography.h6,
    paper: {
        width: '1000px',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: theme.spacing(0),
        marginBottom: theme.spacing(5),
    },
    container: {
        position: 'relative',
        paddingTop: '172px'
    },
    image: {
        position: 'absolute',
        left: 'calc(50% - 350px)',
        top: '0%'
    },
}));

function SubscriptionPageView(props) {
    const classes = useStyles();

    const user = useSelector((state) => state.user);
    const userInfo = useSelector((state) => state.user.userInfo);
    const [open, setOpen] = React.useState(false);

    const loadUser = async () => {
        // trigger the redux action getUsersInfo
        props.dispatch(getUsersInfo(user.user.id));
    };

    useEffect(() => {
        if (user.user) loadUser();
    }, []);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSignUp = (v) => {
        //pass subscription plan to sign up page
        props.history.push({ pathname: '/register', subscriptionPlan: v });
    };

    const onChangePlan = (v) => {
        //pass subscription plan to sign up page
        if (userInfo.subscriptionPlan === 'free' && v === 'premium') {
            console.log('want to change');
            props.history.push('/premium/changePlan');
        } else if (userInfo.subscriptionPlan === 'premium' && v === 'free') {
            handleOpen();
        }
    };

    return (
        <div className={classes.container}>
                <img src={pets} alt="pets" width="700" className={classes.image}/>
          
            <Paper className={classes.paper}>
                <Container maxWidth="sm" component="main" className={classes.premiumDescription}>
                    <Typography className={classes.title} align="center" gutterBottom>
                        Get Access to All Features!
                    </Typography>
                    <Typography  className={classes.description} align="center" component="p">
                        Basic product or service is provided free of charge, but money (a premium) is charged for additional features, services, or virtual (online) or physical (offline) goods that
                        expand the functionality of the free version.
                    </Typography>
                </Container>
                <Container maxWidth="md" component="main">
                    <Grid container spacing={5} alignItems="flex-end">
                        <SubscriptionPlanComponent onClick={user.userInfo ? onChangePlan : onSignUp} subscriptionPlan={user.userInfo ? userInfo.subscriptionPlan : ''} />
                    </Grid>
                </Container>

                <div>
                    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                            Switching from Premium to Basic
                        </DialogTitle>
                        <DialogContent dividers>
                            <Typography gutterBottom>After your Premium Subscription is completed your plan will be automatically switched to Basic.</Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus variant="contained" onClick={handleClose} color="primary">
                                OK
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </Paper>
        </div>
    );
}
export default connect()(withRouter(SubscriptionPageView));
