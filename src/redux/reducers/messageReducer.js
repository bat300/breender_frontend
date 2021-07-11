function messages(state = {}, action) {
    switch (action.type) {
        case 'GET_MESSAGES':
            return { ...state, messages: action.messages };
        case 'DELETE_MESSAGE':
            return { ...state, messages: action.messages };
        case 'ADD_MESSAGE':
            return { ...state };
        case 'UPDATE_MESSAGE':
            return { ...state, message: action.message };
        case 'GET_MESSAGE':
            return { ...state, message: action.message };
        default:
            return state;
    }
}

export default messages;
