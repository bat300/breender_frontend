import React, { useEffect } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import LoginComponent from '../components/UserLoginComponent';

import { login, startLoading, stopLoading } from '../redux/actions';

/**
 * For user login
 * @param {props} props
 */
function UserLoginView(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.user);

    useEffect(() => {
        if (user.user) {
            history.push('/');
        }
    }, [user, props.history]);

    const onLogin = async (username, password) => {
        dispatch(startLoading());
        await dispatch(login(username, password));
        dispatch(stopLoading());
    };

    const onCancel = () => {
        history.push('/');
    };

    const onSignUp = () => {
        history.push('/register');
    };

    return <LoginComponent user={user} onCancel={onCancel} onLogin={onLogin} onSignUp={onSignUp} />;
}

export default connect()(withRouter(UserLoginView));
