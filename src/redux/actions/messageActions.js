import MessageService from '../../services/MessageService';

const MessageTypes = {
    GET_MESSAGES: 'GET_MESSAGES',
    DELETE_MESSAGE: 'DELETE_MESSAGE',
    UPDATE_MESSAGE: 'UPDATE_MESSAGE',
    ADD_MESSAGE: 'ADD_MESSAGE',
    GET_MESSAGE: 'GET_MESSAGE',
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

export const getMessages = (conversationId) => {
    // when the backend call was successfull and the messages are retrieved
    // in the dispatcher the messages will be added to the global state
    const onSuccess = (messages) => {
        return { type: MessageTypes.GET_MESSAGES, messages: messages };
    };
    // when the backend call was failed
    const onFailure = (error) => {
        // error handling
        console.log('failed to get the messages', error);
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
