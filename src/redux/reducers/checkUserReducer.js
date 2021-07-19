export default function checkUser(state = {}, action) {
    switch (action.type) {
        case 'USER_UNIQUE_SUCCESS':
            return {};
        case 'USER_UNIQUE_FAILURE':
            return { error: action.error };
        case 'RESET_ERROR':
            return {};
        default:
            return state;
    }
}
