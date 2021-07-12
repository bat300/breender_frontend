import UserService from '../../services/UserService';

const UserTypes = {
    GET_USER: 'GET_USER',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    LOGIN_RESET: 'LOGIN_RESET',
    CONFIRM_EMAIL_SUCCESS: 'CONFIRM_EMAIL_SUCCESS',
    CONFIRM_EMAIL_FAILURE: 'CONFIRM_EMAIL_FAILURE',
    LOGOUT: 'LOGOUT',
};

export function login(username, password) {
    function onSuccess(user) {
        return { type: UserTypes.LOGIN_SUCCESS, user: user };
    }
    function onFailure(error) {
        return { type: UserTypes.LOGIN_FAILURE, error: error };
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
        return { type: UserTypes.CONFIRM_EMAIL_SUCCESS, confirmation: confirmation };
    }
    function onFailure(error) {
        return { type: UserTypes.CONFIRM_EMAIL_FAILURE, error: error };
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

export function logout() {
    UserService.logout();
    return { type: UserTypes.LOGOUT };
}

export function loginReset() {
    return { type: UserTypes.LOGIN_RESET };
}

export function register(email, username, password, city, isAdmin) {
    function onSuccess(user) {
        return { type: UserTypes.LOGIN_SUCCESS, user: user };
    }
    function onFailure(error) {
        return { type: UserTypes.LOGIN_FAILURE, error: error };
    }

    return async (dispatch) => {
        try {
            let resp = await UserService.register(email, username, password, city, isAdmin);
            dispatch(onSuccess(resp.user));
        } catch (e) {
            dispatch(onFailure(e));
        }
    };
}

export const getUser = (id) => {
    const getUserAction = (user) => {
        return { type: UserTypes.GET_USER, user: user };
    };
    const onFailure = (error) => {
        console.log('Failed to load a user', error);
    };

    return async (dispatch, getState) => {
        try {
            let user = await UserService.getUser(id);
            dispatch(getUserAction(user));
        } catch (e) {
            onFailure(e);
        }
    };
};
