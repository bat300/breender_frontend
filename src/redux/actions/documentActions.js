import DocumentService from 'services/DocumentService';
export function verifyDocument(docId, docType) {
    // when the backend call was successfull and the was verified
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
            // verify doc in the backend
            await DocumentService.verifyDocument(docId, docType);
            // call onSuccess in context of redux
            dispatch(onSuccess());
        } catch (e) {
            onFailure(e);
        }
    };
}

export function declineDocument(docId, docType) {
    // when the backend call was successfull and the document was declined
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
            // decline doc in the backend
            await DocumentService.declineDocument(docId, docType);
            // call onSuccess in context of redux
            dispatch(onSuccess());
        } catch (e) {
            onFailure(e);
        }
    };
}

export function getDocuments() {
    // when the backend call was successfull and unprocessed docs are retrieved
    // in the dispatcher unprocessed docs will be added to the global state
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
            // ask for the docs in the backend
            let documents = await DocumentService.getDocuments();
            // call onSuccess in context of redux
            dispatch(onSuccess(documents));
        } catch (e) {
            onFailure(e);
        }
    };
}

export function getDeclinedDocuments() {
    // when the backend call was successfull and the declined docs sare retrieved
    // in the dispatcher the declined docs will be added to the global state
    function onSuccess(documents) {
        return { type: 'GET_PROCESSED_DOCUMENTS_SUCCESS', documents: documents };
    }
    // when the backend call was failed
    function onFailure(error) {
        // error handling
        console.log('failed to get processed documents', error);
    }

    return async (dispatch) => {
        try {
            // ask for the docs in the backend
            let documents = await DocumentService.getProcessedDocuments('declined');
            // call onSuccess in context of redux
            dispatch(onSuccess(documents));
        } catch (e) {
            onFailure(e);
        }
    };
}


export function getVerifiedDocuments() {
    // when the backend call was successfull and the verified docs are retrieved
    // in the dispatcher the verified docs will be added to the global state
    function onSuccess(documents) {
        return { type: 'GET_PROCESSED_DOCUMENTS_SUCCESS', documents: documents };
    }
    // when the backend call was failed
    function onFailure(error) {
        // error handling
        console.log('failed to get processed documents', error);
    }

    return async (dispatch) => {
        try {
            // ask for the docsmin the backend
            let documents = await DocumentService.getProcessedDocuments('verified');
            // call onSuccess in context of redux
            dispatch(onSuccess(documents));
        } catch (e) {
            onFailure(e);
        }
    };
}


