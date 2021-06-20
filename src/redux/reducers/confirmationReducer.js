export default function confirmation(state = {}, action) {
    switch (action.type) {
        case "CONFIRM_EMAIL_SUCCESS": 
            return {confirmation: action.confirmation};
        case "CONFIRM_EMAIL_FAILURE":
            return { error: action.error};
        default:
            return state;
    }
}