import { getUser } from 'helper/helpers';

export default function user(state = getUser(), action) {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return { user: action.user, isAuthenticated: true };
        case 'LOGIN_FAILURE':
            return { error: 'Password or username incorrect.' };
        case 'LOGIN_RESET':
            return { user: action.user, isAuthenticated: action.isAuthenticated };
        case 'LOGOUT':
            return {};
        default:
            return state;
    }
}
