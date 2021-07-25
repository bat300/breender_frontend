import { getUserFromToken } from 'helper/helpers';
import { NotificationService } from 'services';
import UserService from '../../services/UserService';

export function resetError() {
    return {
        type: 'RESET_ERROR',
    };
}

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
    function onSuccess(user, isAuthenticated) {
        return { type: 'LOGIN_RESET', user: user, isAuthenticated: isAuthenticated };
    }
    return (dispatch) => {
        let { isAuthenticated, user } = getUserFromToken();
        dispatch(onSuccess(user, isAuthenticated));
    };
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
            NotificationService.notify('error', 'Registration Error', 'During registration occurred an error. Please try again.');
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
        console.log('Failed to get the pets', error);
    };

    return async (dispatch, getState) => {
        try {
            // ask for the pets in the backend
            const pets = await UserService.getUserPets(ownerId);
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
            role: user.role,
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
        console.log('Failed to get the pets', error);
    };

    return async (dispatch, getState) => {
        try {
            // ask for the pets in the backend
            const pets = await UserService.getUserPets(ownerId);
            // call onSuccess in context of redux
            dispatch(onSuccess(pets));
        } catch (e) {
            onFailure(e);
        }
    };
};

export const getReviewsOnUser = (id) => {
    // when the backend call was successfull and the reviews are retrieved
    // in the dispatcher the reviews will be added to the global state
    const onSuccess = (reviews) => {
        return { type: 'GET_REVIEWS_ON_USER', reviews: reviews };
    };
    // when the backend call was failed
    const onFailure = (error) => {
        // error handling
        console.log('Failed to get the reviews', error);
    };

    return async (dispatch, getState) => {
        try {
            // ask for the reviews in the backend
            const reviews = await UserService.getReviewsOnUser(id);
            // call onSuccess in context of redux
            dispatch(onSuccess(reviews));
        } catch (e) {
            onFailure(e);
        }
    };
};

export const getReviewsOnSelectedUser = (id) => {
    // when the backend call was successfull and the reviews are retrieved
    // in the dispatcher the reviews will be added to the global state
    const onSuccess = (reviews) => {
        return { type: 'GET_REVIEWS_ON_SELECTED_USER', reviews: reviews };
    };
    // when the backend call was failed
    const onFailure = (error) => {
        // error handling
        console.log('Failed to get the reviews', error);
    };

    return async (dispatch, getState) => {
        try {
            // ask for the reviews in the backend
            const reviews = await UserService.getReviewsOnUser(id);
            // call onSuccess in context of redux
            dispatch(onSuccess(reviews));
        } catch (e) {
            onFailure(e);
        }
    };
};

export const addReview = (review, onSuccess = () => null, onError = (err) => null) => {
    const addReviewAction = () => {
        onSuccess();
        return { type: 'ADD_REVIEW' };
    };
    const onFailure = (err) => {
        onError();
        console.log('Failed to save the review', err);
    };

    return async (dispatch, getState) => {
        try {
            // save the review in the backend
            await UserService.addReview(review);
            // call onSuccess in context of redux
            dispatch(addReviewAction());
        } catch (e) {
            onFailure(e);
        }
    };
};
