function messages(state = {}, action) {
    switch (action.type) {
        case 'GET_MESSAGES':
            // Check if every message in action.messages in in the messages state already and update the message state if not
            if (!state.messages) {
                return { ...state, messages: action.messages };
            }
            if (
                action.messages.length !== state.messages.length ||
                !action.messages.every((m1) =>
                    state.messages.find((m2) => {
                        return m2._id == m1._id;
                    })
                )
            ) {
                return { ...state, messages: action.messages };
            } else {
                return state;
            }
        case 'GET_UNREAD_MESSAGES':
            return { ...state, unseenMessages: action.unseenMessages };
        case 'ADD_MESSAGE':
            return { ...state };
        case 'GET_MESSAGE':
            return { ...state, message: action.message };
        default:
            return state;
    }
}

export default messages;
