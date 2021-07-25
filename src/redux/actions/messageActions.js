import MessageService from '../../services/MessageService';

const MessageTypes = {
    GET_MESSAGES: 'GET_MESSAGES',
    GET_UNREAD_MESSAGES: 'GET_UNREAD_MESSAGES',
    UPDATE_MESSAGES_TO_READ: 'UPDATE_MESSAGES_TO_READ',
    ADD_MESSAGE: 'ADD_MESSAGE',
};

export const addMessage = (message) => {
    const addMessageAction = () => {
        return { type: MessageTypes.ADD_MESSAGE };
    };
    const onFailure = (err) => {
        console.log(err);
    };

    return async (dispatch) => {
        await MessageService.createMessage(message)
            .then(() => {
                dispatch(addMessageAction());
            })
            .catch((e) => {
                onFailure(e);
            });
    };
};

export const updateMessagesToSeen = (messageIds) => {
    const onSuccess = () => {
        return { type: MessageTypes.UPDATE_MESSAGES_TO_READ };
    };
    const onFailure = (err) => {
        console.log(err);
    };

    return async (dispatch) => {
        await MessageService.updateMessagesToSeen(messageIds)
            .then(() => {
                dispatch(onSuccess());
            })
            .catch((e) => {
                onFailure(e);
            });
    };
};

export const getMessages = (conversationId) => {
    // when the backend call was successfull and the messages are retrieved
    // in the dispatcher the messages will be added to the global state
    const onSuccess = (messages) => {
        return { type: MessageTypes.GET_MESSAGES, messages: messages };
    };
    // when the backend call was failed
    const onFailure = (error) => {
        // error handling
        console.log('Failed to get the messages', error);
    };

    return async (dispatch, getState) => {
        try {
            // ask for the messages in the backend
            let messages = await MessageService.getMessages(conversationId);
            // call onSuccess in context of redux
            dispatch(onSuccess(messages));
        } catch (e) {
            onFailure(e);
        }
    };
};

export const getUnseenMessages = (userId) => {
    // when the backend call was successfull and the messages are retrieved
    // in the dispatcher the messages will be added to the global state
    const onSuccess = (unseenMessages) => {
        return { type: MessageTypes.GET_UNREAD_MESSAGES, unseenMessages: unseenMessages };
    };
    // when the backend call was failed
    const onFailure = (error) => {
        // error handling
        console.log('Failed to get the messages', error);
    };

    return async (dispatch, getState) => {
        try {
            // ask for the unread messages in the backend
            let unseenMessages = await MessageService.getUnseenMessages(userId);
            // call onSuccess in context of redux
            dispatch(onSuccess(unseenMessages));
        } catch (e) {
            onFailure(e);
        }
    };
};
