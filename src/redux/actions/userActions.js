import UserService from '../../services/UserService';

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

export function logout() {
    UserService.logout();
    return { type: 'LOGOUT' };
}

export function loginReset() {
    return { type: 'LOGIN_RESET' };
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
        }
    };
}

export const getUsersInfo = (id) => {
    const getUsersInfoAction = (user) => {
        return { type: 'GET_USER_INFO', user: user };
    };
    const onFailure = (error) => {
        console.log('Failed to load a user', error);
    };

    return async (dispatch, getState) => {
        try {
            const user = await UserService.getUsersInfo(id);
            dispatch(getUsersInfoAction(user));
        } catch (e) {
            onFailure(e);
        }
    };
};

export const getUserPets = (ownerId) => {
    // when the backend call was successfull and the pets are retrieved
    // in the dispatcher the pets will be added to the global state
    const onSuccess = (pets) => {
        return { type: 'GET_USER_PETS', pets: pets };
    };
    // when the backend call was failed
    const onFailure = (error) => {
        // error handling
        console.log('failed to get the pets', error);
    };

    return async (dispatch, getState) => {
        try {
            console.log('I am in actions')
            // ask for the pets in the backend
            const pets = await UserService.getUserPets(ownerId);
            console.log('The pets are in the actions: ', pets)
            // call onSuccess in context of redux
            dispatch(onSuccess(pets));
        } catch (e) {
            onFailure(e);
        }
    };
};

export const updateUser = (user, onSuccess = () => null, onError = (err) => null) => {
    const updateUserAction = (user) => {
        onSuccess();
        let user_for_redux = {
            id: user._id,
            username: user.username,
            role: user.role
        };
        return { type: 'UPDATE_USER', user: user_for_redux, userInfo: user };
    };
    const onFailure = (error) => {
        onError();
        console.log('Failed to update user', error);
    };

    return async (dispatch, getState) => {
        try {
            let updatedUser = await UserService.updateUser(user);
            dispatch(updateUserAction(updatedUser));
        } catch (e) {
            onFailure(e);
        }
    };
};

export const getUser = (id) => {
    const getUsersInfoAction = (user) => {
        return { type: 'GET_SELECTED_USER', user: user };
    };
    const onFailure = (error) => {
        console.log('Failed to load a user', error);
    };

    return async (dispatch, getState) => {
        try {
            const user = await UserService.getUsersInfo(id);
            dispatch(getUsersInfoAction(user));
        } catch (e) {
            onFailure(e);
        }
    };
};

export const getSelectedUserPets = (ownerId) => {
    // when the backend call was successfull and the pets are retrieved
    // in the dispatcher the pets will be added to the global state
    const onSuccess = (pets) => {
        return { type: 'GET_SELECTED_USER_PETS', pets: pets };
    };
    // when the backend call was failed
    const onFailure = (error) => {
        // error handling
        console.log('failed to get the pets', error);
    };

    return async (dispatch, getState) => {
        try {
            console.log('I am in actions')
            // ask for the pets in the backend
            const pets = await UserService.getUserPets(ownerId);
            console.log('The pets are in the actions: ', pets)
            // call onSuccess in context of redux
            dispatch(onSuccess(pets));
        } catch (e) {
            onFailure(e);
        }
    };
};
