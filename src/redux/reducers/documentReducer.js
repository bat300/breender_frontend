const initialState = {
    documents: []
};

const documents = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_DOCUMENTS_SUCCESS':
            return { ...state, documents: action.documents };
        case "VERIFY_DOCUMENTS_SUCCESS":
            {}
        case "DECLINE_DOCUMENTS_SUCCESS":
            {}
        default:
            return state;
    }
};

export default documents;
