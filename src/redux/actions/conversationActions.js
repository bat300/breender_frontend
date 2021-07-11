import ConversationService from '../../services/ConversationService';

const ConversationTypes = {
    GET_CONVERSATIONS: 'GET_CONVERSATIONS',
    DELETE_CONVERSATION: 'DELETE_CONVERSATION',
    UPDATE_CONVERSATION: 'UPDATE_CONVERSATION',
    ADD_CONVERSATION: 'ADD_CONVERSATION',
    GET_CONVERSATION: 'GET_CONVERSATION',
};

export const addConversation = (conversation) => {
    const addConversationAction = () => {
        return { type: ConversationTypes.ADD_CONVERSATION };
    };
    const onFailure = (err) => {
        console.log(err);
    };

    return async (dispatch) => {
        await ConversationService.createConversation(conversation)
            .then(() => {
                dispatch(addConversationAction());
            })
            .catch((e) => {
                onFailure(e);
            });
    };
};

export const getConversations = (userId) => {
    // when the backend call was successfull and the conversations are retrieved
    // in the dispatcher the conversations will be added to the global state
    const onSuccess = (conversations) => {
        return { type: ConversationTypes.GET_CONVERSATIONS, conversations: conversations };
    };
    // when the backend call was failed
    const onFailure = (error) => {
        // error handling
        console.log('failed to get the conversations', error);
    };

    return async (dispatch, getState) => {
        try {
            // ask for the conversations in the backend
            let conversations = await ConversationService.getConversations(userId);
            // call onSuccess in context of redux
            dispatch(onSuccess(conversations));
        } catch (e) {
            onFailure(e);
        }
    };
};

export const getConversation = (id1, id2) => {
    // when the backend call was successfull and the conversation are retrieved
    // in the dispatcher the conversation will be added to the global state
    const onSuccess = (conversation) => {
        return { type: ConversationTypes.GET_CONVERSATION, conversation: conversation };
    };
    // when the backend call was failed
    const onFailure = (error) => {
        // error handling
        console.log('failed to get the conversation', error);
    };

    return async (dispatch, getState) => {
        try {
            // ask for the conversation in the backend
            let conversation = await ConversationService.getConversation(id1, id2);
            // call onSuccess in context of redux
            dispatch(onSuccess(conversation));
        } catch (e) {
            onFailure(e);
        }
    };
};
