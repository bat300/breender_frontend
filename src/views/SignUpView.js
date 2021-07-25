import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getUsersInfo, register, resetError, startLoading, stopLoading } from '../redux/actions';
import NotificationService from 'services/NotificationService';
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
    const dispatch = useDispatch();

    useEffect(() => {
        if (user.user) {
            NotificationService.notify('success', 'Success', 'Account was successfully created! Please check your inbox for verification link.');
            props.history.push('/');
            props.dispatch(getUsersInfo(user.user.id));
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

    const onRegister = async (email, username, password, city, province, isAdmin, subscriptionPlan, paymentPlan, paymentMethod) => {
        dispatch(startLoading());
        await dispatch(register(email, username, password, city, province, isAdmin, subscriptionPlan, paymentPlan, paymentMethod));
        dispatch(stopLoading());
    };

    const onCancel = () => {
        props.history.push('/');
    };

    const goToHome = () => props.history.push('/');

    return (
        <div className={classes.container}>
            <div onClick={goToHome}>
                <img alt="logo" src={logo} className={classes.logo} />
            </div>
            <SignUpPaper user={user} onRegister={onRegister} onCancel={onCancel} />
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    logo: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 100,
        marginBottom: 50,
        maxWidth: 280,
        maxHeight: 'auto',
        cursor: 'pointer',
    },
    container: {
        position: 'relative',
        display: 'flex',        
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
}));

export default connect()(withRouter(SignUpView));
