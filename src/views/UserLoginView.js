import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import LoginComponent from "../components/UserLoginComponent";
import NotificationService from "services/NotificationService";
import { login, loginReset, me } from "../redux/actions";

/**
 * For user login
 * @param {props} props
 */
function UserLoginView(props) {
    const user = useSelector((state) => state.user);

    useEffect(() => {
        if (user.user?.id) {
            NotificationService.notify('success', 'Success', 'Sucessfully signed in.');
            props.history.push("/");
            props.dispatch(me(user.user.id))
        }
    }, [user, props]);

    const onLogin = (username, password) => {
        props.dispatch(login(username, password));
    };

    const onCancel = () => {
        props.history.push("/");
    };

    const onSignUp = () => {
        props.dispatch(loginReset());
        props.history.push("/register");
    };

    return (
        <LoginComponent
            user={user}
            onCancel={onCancel}
            onLogin={onLogin}
            onSignUp={onSignUp}
        />
    );
}

export default connect()(withRouter(UserLoginView));
