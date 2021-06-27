import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { register } from '../redux/actions';
import SignUpPaper from '../components/SignUpPaper';

/**
 * For register new users
 * @param {props} props
 */
function SignUpView(props) {
    const user = useSelector((state) => state.user);

    useEffect(() => {
        if (user.user) {
            props.history.push('/');
        }
    }, [user, props.history]);

    const onRegister = (email, username, password, city, isAdmin, subscriptionPlan) => {
        props.dispatch(register(email, username, password, city, isAdmin, subscriptionPlan));
    };

    const onCancel = () => {
        props.history.push('/');
    };

    return <SignUpPaper user={user} onRegister={onRegister} onCancel={onCancel} />;
}

export default connect()(withRouter(SignUpView));
