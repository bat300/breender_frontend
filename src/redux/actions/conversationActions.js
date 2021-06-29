import ConversationService from '../../services/ConversationService';

const ConversationTypes = {
    GET_CONVERSATIONS: 'GET_CONVERSATIONS',
    DELETE_CONVERSATION: 'DELETE_CONVERSATION',
    UPDATE_CONVERSATION: 'UPDATE_CONVERSATION',
    ADD_CONVERSATION: 'ADD_CONVERSATION',
    GET_CONVERSATION: 'GET_CONVERSATION',
};

export const getConversations = (userId) => {
    // when the backend call was successfull and the conversations are retrieved
    // in the dispatcher the conversations will be added to the global state
    function onSuccess(conversations) {
        return { type: 'GETCONVERSATIONS_SUCCESS', conversations: conversations };
    }
    // when the backend call was failed
    function onFailure(error) {
        // error handling
        console.log('failed to get the conversations', error);
    }

    return async (dispatch) => {
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
