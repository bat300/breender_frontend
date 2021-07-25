import React, { useEffect } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import LoginComponent from '../components/UserLoginComponent';
import { login, startLoading, stopLoading, loginReset, getUsersInfo, getUser } from '../redux/actions';
import NotificationService from 'services/NotificationService';
import { getUnseenMessages } from '../redux/actions/messageActions';
import logo from '../images/breender.svg';
import { makeStyles } from '@material-ui/core';

/**
 * For user login
 * @param {props} props
 */
function UserLoginView(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.user);

    useEffect(() => {
        if (user.user?.id) {
            NotificationService.notify('success', 'Success', 'Sucessfully signed in.');
            props.history.push('/');
            props.dispatch(getUsersInfo(user.user.id));
            props.dispatch(getUser(user.user.id));
            props.dispatch(getUnseenMessages(user.user.id));
        }
    }, [user, props]);

    const onLogin = async (username, password) => {
        dispatch(startLoading());
        await dispatch(login(username, password));
        dispatch(stopLoading());
    };

    const onCancel = () => {
        history.push('/');
    };

    const onSignUp = () => {
        props.history.push('/register');
    };

    const goToHome = () => props.history.push('/');

    return (
        <div className={classes.container}>
            <div onClick={goToHome}>
                <img alt="logo" src={logo} className={classes.logo} />
            </div>
            <LoginComponent user={user} onCancel={onCancel} onLogin={onLogin} onSignUp={onSignUp} />
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
        maxWidth: 425,
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

export default connect()(withRouter(UserLoginView));
