import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { register, resetError } from '../redux/actions';
import NotificationService from 'services/NotificationService';
import SignUpComponent from 'components/SignUpComponent';
import SignUpPaper from 'components/SignUpPaper';
import { makeStyles } from '@material-ui/core';
import logo from '../images/breender.svg';

/**
 * For register new users
 * @param {props} props
 */
function SignUpView(props) {
    const classes = useStyles();
    const user = useSelector((state) => state.user);

    useEffect(() => {
        if (user.user) {
            NotificationService.notify('success', 'Success', 'Account was successfully created! Please check your inbox for verification link.');
            props.history.push('/');
        }
        if (user.error) {
            setTimeout(function () {
                NotificationService.notify('error', 'Error', 'An error occured while creating an account. Please try again later.');
            }, 2000); //delay function to get fresh error
        }
        //reset errors when functional component unmounts
        return () => {
            props.dispatch(resetError());
        };
    }, [user, props.history]);

    const onRegister = (email, username, password, city, province, isAdmin, subscriptionPlan, paymentPlan, paymentMethod) => {
        props.dispatch(register(email, username, password, city, province, isAdmin, subscriptionPlan, paymentPlan, paymentMethod));
    };

    const onCancel = () => {
        props.history.push('/');
    };

    const goToHome = () => props.history.push('/');

    return (
        <>
            <div onClick={goToHome}>
                <img alt="logo" src={logo} className={classes.logo} />
            </div>
            <SignUpPaper user={user} onRegister={onRegister} onCancel={onCancel} />
        </>
    );
}

const useStyles = makeStyles((theme) => ({
    logo: {
        position: 'absolute',
        marginLeft: 'auto',
        marginRight: 'auto',
        left: 0,
        right: 0,
        top: 35,
        maxWidth: 280,
        maxHeight: 'auto',
        cursor: 'pointer',
    },
}));

export default connect()(withRouter(SignUpView));
