import DocumentService from 'services/DocumentService';
export function verifyDocument(docId, docType) {
    // when the backend call was successfull and the competitionsare retrieved
    // in the dispatcher the competitions will be added to the global state
    function onSuccess() {
        return { type: 'VERIFY_DOCUMENT_SUCCESS' };
    }
    // when the backend call was failed
    function onFailure(error) {
        // error handling
        console.log('failed to verify document', error);
    }

    return async (dispatch) => {
        try {
            // ask for the docsin the backend
            await DocumentService.verifyDocument(docId, docType);
            // call onSuccess in context of redux
            dispatch(onSuccess());
        } catch (e) {
            onFailure(e);
        }
    };
}

export function declineDocument(docId, docType) {
    // when the backend call was successfull and the competitionsare retrieved
    // in the dispatcher the competitions will be added to the global state
    function onSuccess() {
        return { type: 'DECLINE_DOCUMENT_SUCCESS' };
    }
    // when the backend call was failed
    function onFailure(error) {
        // error handling
        console.log('failed to decline document', error);
    }

    return async (dispatch) => {
        try {
            // ask for the docsin the backend
            await DocumentService.declineDocument(docId, docType);
            // call onSuccess in context of redux
            dispatch(onSuccess());
        } catch (e) {
            onFailure(e);
        }
    };
}

export function getDocuments() {
    // when the backend call was successfull and the competitionsare retrieved
    // in the dispatcher the competitions will be added to the global state
    function onSuccess(documents) {
        return { type: 'GET_DOCUMENTS_SUCCESS', documents: documents };
    }
    // when the backend call was failed
    function onFailure(error) {
        // error handling
        console.log('failed to get the documents', error);
    }

    return async (dispatch) => {
        try {
            // ask for the docsin the backend
            let documents = await DocumentService.getDocuments();
            // call onSuccess in context of redux
            dispatch(onSuccess(documents));
        } catch (e) {
            onFailure(e);
        }
    };
}


