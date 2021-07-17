import UserService from '../../services/UserService';

export function resetError() {
    return {
        type: 'RESET_ERROR',
    };
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

export function checkUser(email, username, isAdmin) {
    function onSuccess() {
        return { type: 'USER_UNIQUE_SUCCESS' };
    }
    function onFailure(error) {
        return { type: 'USER_UNIQUE_FAILURE', error: error };
    }

    return async (dispatch) => {
        try {
            let resp = await UserService.checkUser(email, username, isAdmin);
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

export function register(email, username, password, city, province, isAdmin, subscriptionPlan, paymentPlan, paymentMethod) {
    function onSuccess(user) {
        return { type: 'LOGIN_SUCCESS', user: user };
    }
    function onFailure(error) {
        return { type: 'LOGIN_FAILURE', error: error };
    }

    return async (dispatch) => {
        try {
            let resp = await UserService.register(email, username, password, city, province, isAdmin, subscriptionPlan, paymentPlan, paymentMethod);
            dispatch(onSuccess(resp.user));
        } catch (e) {
            dispatch(onFailure(e));
        }
    };
}
export function update(id, subscriptionPlan, paymentPlan, paymentMethod,onSuccess=() => null, onError=(err) => null) {
    const updateUserAction = (user) => {
        onSuccess();
        return { type: 'UPDATE_SUCCESS', user: user };
    };

    return async (dispatch) => {
        await UserService.update(id, subscriptionPlan, paymentPlan, paymentMethod).then((resp) => dispatch(updateUserAction(resp.user))).catch((e) => {
                onError(e);
            });
            
    };
}
