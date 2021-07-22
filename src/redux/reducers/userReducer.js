import { getUserFromToken } from 'helper/helpers';

export default function user(state = getUserFromToken(), action) {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return { user: action.user, isAuthenticated: true };
        case 'LOGIN_FAILURE':
            return { error: 'Password or username incorrect.' };
        case 'LOGIN_RESET':
            return { user: action.user, isAuthenticated: action.isAuthenticated };
        case 'LOGOUT':
            return {};
        case "GET_USER_INFO":
            return { ...state, userInfo: action.user };
        case "GET_USER_PETS":
            return { ...state, pets: action.pets };
        case "UPDATE_USER":
            return { ...state, user: action.user, userInfo: action.userInfo };
        case "GET_SELECTED_USER":
            return { ...state, selectedUser: action.user };
        case "GET_SELECTED_USER_PETS":
            return { ...state, selectedUserPets: action.pets };
        case "GET_REVIEWS_ON_USER":
            return { ...state, reviews: action.reviews };
        case "GET_REVIEWS_ON_SELECTED_USER":
            return { ...state, reviewsOnSelectedUser: action.reviews };
        case "ADD_REVIEW":
            return { ...state }
        case 'GET_LOGGEDINUSER':
            return { ...state, loggedInUser: action.loggedInUser };
        default:
            return state;
    }
}
