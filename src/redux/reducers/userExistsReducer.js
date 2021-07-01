export default function userExists(state = {}, action) {
    switch (action.type) {
        case 'USER_UNIQUE_SUCCESS':
            return {};
        case 'USER_UNIQUE_FAILURE':
            return { error: action.error };
        default:
            return state;
    }
}
