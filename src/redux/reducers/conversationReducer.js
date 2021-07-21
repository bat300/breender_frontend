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
            var filteredConversations = [];
            if (state.conversations) {
                filteredConversations = state.conversations.filter((val) => {
                    return val._id !== action.conversation._id;
                });
            }
            return {
                ...state,
                conversations: [].concat(action.conversation, filteredConversations),
                // [...state.conversations, action.conversation],
                conversation: action.conversation,
            };
        default:
            return state;
    }
}

export default conversations;
