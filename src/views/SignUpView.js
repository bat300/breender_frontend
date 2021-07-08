import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { register, resetError } from '../redux/actions';
import SignUpPaper from '../components/SignUpPaper';
import NotificationService from 'services/NotificationService';

/**
 * For register new users
 * @param {props} props
 */
function SignUpView(props) {
    const user = useSelector((state) => state.user);

    useEffect(() => {
        if (user.user) {
            NotificationService.notify('success', 'Success', 'Account was successfully created! Please check your inbox for verification link.');
            props.history.push('/');
        }
        if (user.error) {
            setTimeout(function() {  NotificationService.notify('error', 'Error', 'An error occured while creating an account. Please try again later.'); }, 2000); //delay function to get fresh error
        }
        //reset errors when functional component unmounts
        return () => {
            props.dispatch(resetError());
        }
    }, [user, props.history]);

    const onRegister = (email, username, password, city, province, isAdmin, subscriptionPlan, renewalFrequency, paymentMethod) => {
        props.dispatch(register(email, username, password, city, province, isAdmin, subscriptionPlan, renewalFrequency, paymentMethod));
    };

    const onCancel = () => {
        props.history.push('/');
    };

    return <SignUpPaper user={user} onRegister={onRegister} onCancel={onCancel} subscriptionPlan={props.location.subscriptionPlan}/>;
}

export default connect()(withRouter(SignUpView));
