import React from 'react';
import PaymentInformationComponent from '../components/PaymentInformation';
import { connect, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { update } from 'redux/actions';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import { Result } from 'antd';
import cat from '../images/cat.png';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
    },
    paper: {
        width: '1000px',
        height: '425px',
        padding: theme.spacing(2),
    },
    active: {
        color: '#D37F65',
    },
    circle: {
        width: 12,
        height: 12,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
    },
    completed: {
        color: '#D37F65',
        zIndex: 1,
        fontSize: 18,
    },
}));
/**
 * For presenting and choosing subscription plan and paying with PayPal
 * @param {props} props
 */
function ChangeToPremiumView(props) {
    const classes = useStyles();

    const user = useSelector((state) => state.user);
    const [paymentProcessed, setPaymentProcessed] = React.useState(true);
    const [status, setStatus] = React.useState(false);

    const payments = [
        { description: '4.99€ for 1 month', plan: '1mo', price: '4.99' },
        { description: '12,99€ for 3 months', plan: '3mo', price: '12.99' },
        { description: '22,99€ for 6 months', plan: '6mo', price: '22.99' },
        { description: '34,99€ for 1 year', plan: '1yr', price: '34.99' },
    ];

    const [chosenPayment, setChosenPayment] = React.useState('4.99');

    const values = { chosenPayment };

    function changeSubscriptionPlanToPremium(plan, paymentMethod) {
        const onSuccess = () => {
            setPaymentProcessed(false);
            setStatus(true);
            setTimeout(function () {
                props.history.push('/login');
            }, 2000);
        };

        const onError = () => {
            setPaymentProcessed(false);
            setStatus(false);
            setTimeout(function () {
                props.history.push('/');
            }, 1000);
        };

        props.dispatch(update(user.user.id, 'premium', plan, paymentMethod, onSuccess, onError));
    }

    const prevStep = () => {
        props.history.push('/premium');
    };

    function handleChange(input, event) {
        setChosenPayment(event.target.value);
    }

    return paymentProcessed ? (
        <PaymentInformationComponent payments={payments} handleChange={handleChange} values={values} onSuccess={changeSubscriptionPlanToPremium} user={user} prevStep={prevStep} />
    ) : (
        <div className={classes.root} align="center">
            <Paper className={classes.paper}>
            {status? <div><Result status="success" title="Congratulations!" /> <Typography variant="h5">You will be redirected to log in page shortly.</Typography></div> : <div><Result status="warning" title="Something went wrong :(" /><Typography variant="h5">There was a problem in changing your plan. Please try again later or contact our customer service.</Typography></div>} 
                <div>
                    <img src={cat}  alt="cat"/>
                </div>
            </Paper>
        </div>
    );
}

export default connect()(withRouter(ChangeToPremiumView));
