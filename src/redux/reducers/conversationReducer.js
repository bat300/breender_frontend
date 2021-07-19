function conversations(state = {}, action) {
    switch (action.type) {
        case 'GET_CONVERSATIONS':
            return { ...state, conversations: action.conversations };
        case 'DELETE_CONVERSATION':
            return { ...state, conversations: action.conversations };
        case 'ADD_CONVERSATION':
            return { ...state };
        case 'UPDATE_CONVERSATION':
            return { ...state, conversation: action.conversation };
        case 'GET_CONVERSATION':
            return { ...state, conversations: [...state.conversations, action.conversation], conversation: action.conversation };
        default:
            return state;
    }
}

export default conversations;
