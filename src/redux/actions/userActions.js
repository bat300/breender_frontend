import UserService from '../../services/UserService';

export function resetError()  {
    return {
        type: 'RESET_ERROR'
    }
}

export function login(username, password) {
    function onSuccess(user) {
        return { type: 'LOGIN_SUCCESS', user: user };
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
            dispatch(onFailure(e));
        }
    };
}

export function checkUser(email, username) {
    function onSuccess() {
        return { type: 'USER_UNIQUE_SUCCESS' };
    }
    function onFailure(error) {
        return { type: 'USER_UNIQUE_FAILURE', error: error };
    }

    return async (dispatch) => {
        try {
             let resp = await UserService.checkUser(email, username);
            dispatch(onSuccess());
        } catch (e) {
            dispatch(onFailure(e));
        }
    };
}

export function logout() {
    UserService.logout();
    return { type: 'LOGOUT' };
}

export function loginReset() {
    return { type: 'LOGIN_RESET' };
}

export function register(email, username, password, city, province, isAdmin, subscriptionPlan, renewalFrequency, paymentMethod) {
    function onSuccess(user) {
        return { type: 'LOGIN_SUCCESS', user: user };
    }
    function onFailure(error) {
        return { type: 'LOGIN_FAILURE', error: error };
    }

    return async (dispatch) => {
        try {
            console.log(email, username, password, city, province, isAdmin, subscriptionPlan, renewalFrequency, paymentMethod);
            
            let resp = await UserService.register(email, username, password, city, province, isAdmin, subscriptionPlan, renewalFrequency, paymentMethod);
            dispatch(onSuccess(resp.user));
        } catch (e) {
            dispatch(onFailure(e));
        }
    };
}
