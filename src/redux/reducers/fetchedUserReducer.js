export default function fetchedUser(state = {}, action) {
    switch (action.type) {
        case 'GET_USER':
            return { user: action.user };
        default:
            return { user: action.user };
    }
}
