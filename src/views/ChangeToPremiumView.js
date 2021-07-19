import React from 'react';
import PaymentInformationComponent from '../components/PaymentInformation';
import { connect, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NotificationService from 'services/NotificationService';
import { update } from 'redux/actions';

/**
 * For presenting and choosing subscription plan and paying with PayPal
 * @param {props} props
 */
function ChangeToPremiumView(props) {
    const user = useSelector((state) => state.user);

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
            setTimeout(function () {
                props.history.push('/login');
                NotificationService.notify('success', 'Success', 'Your subscription plan was successfully changed! Please login.');
            }, 1000);
        };

        const onError = () => {
            setTimeout(function () {
                props.history.push('/');
                NotificationService.notify('error', 'Error', 'There was a problem in changing your plan. Please try again later or contact our customer service.');
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

    return <PaymentInformationComponent payments={payments} handleChange={handleChange} values={values} onSuccess={changeSubscriptionPlanToPremium} user={user} prevStep={prevStep} />;
}

export default connect()(withRouter(ChangeToPremiumView));
