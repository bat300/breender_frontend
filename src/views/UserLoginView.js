import React, { useEffect } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import LoginComponent from '../components/UserLoginComponent';
import { login, startLoading, stopLoading, loginReset, me } from '../redux/actions';
import { getUnseenMessages } from '../redux/actions/messageActions';
import NotificationService from 'services/NotificationService';

/**
 * For user login
 * @param {props} props
 */
function UserLoginView(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.user);

    useEffect(() => {
        if (user.user?.id) {
            NotificationService.notify('success', 'Success', 'Sucessfully signed in.');
            props.history.push('/');
            props.dispatch(me(user.user.id));
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
        props.dispatch(loginReset());
        props.history.push('/register');
    };

    return <LoginComponent user={user} onCancel={onCancel} onLogin={onLogin} onSignUp={onSignUp} />;
}

export default connect()(withRouter(UserLoginView));
