import { getUser } from 'helper/helpers';
import { NotificationService } from 'services';
import UserService from '../../services/UserService';

export function login(username, password) {
    function onSuccess(user) {
        return { type: 'LOGIN_SUCCESS', user: user, isAuthenticated: true };
    }
    function onFailure(error) {
        return { type: 'LOGIN_FAILURE', error: error };
    }

    return async (dispatch) => {
        try {
            let resp = await UserService.login(username, password);
            dispatch(onSuccess(resp.user));
        } catch (e) {
            dispatch(onFailure(e));
            NotificationService.notify('error', 'Login Error', 'During login occurred an error. Please try again.');
        }
    };
}

export function confirmEmail(email, token) {
    function onSuccess(confirmation) {
        return { type: 'CONFIRM_EMAIL_SUCCESS', confirmation: confirmation };
    }
    function onFailure(error) {
        return { type: 'CONFIRM_EMAIL_FAILURE', error: error };
    }

    return async (dispatch) => {
        try {
            let resp = await UserService.confirmEmail(email, token);
            dispatch(onSuccess(resp));
        } catch (e) {
            NotificationService.notify('error', 'Error', 'During email confirmation occurred an error. Please try again.');
            dispatch(onFailure(e));
        }
    };
}

export function logout() {
    UserService.logout();
    return { type: 'LOGOUT' };
}

export function loginReset() {
    function onSuccess(user, isAuthenticated) {
        return { type: 'LOGIN_RESET', user: user, isAuthenticated: isAuthenticated };
    }
    return (dispatch) => {
        let { isAuthenticated, user } = getUser();
        dispatch(onSuccess(user, isAuthenticated));
    };
}

export function register(email, username, password, city, isAdmin) {
    function onSuccess(user) {
        return { type: 'LOGIN_SUCCESS', user: user };
    }
    function onFailure(error) {
        return { type: 'LOGIN_FAILURE', error: error };
    }

    return async (dispatch) => {
        try {
            let resp = await UserService.register(email, username, password, city, isAdmin);
            dispatch(onSuccess(resp.user));
        } catch (e) {
            dispatch(onFailure(e));
            NotificationService.notify('error', 'Registration Error', 'During registration occurred an error. Please try again.');
        }
    };
}
