const initialState = {
    profilePictureToUpload: {},
    profilePictureToRemove: {},
    pictures: [],
    documents: [],
    competitions: [],
};

const upload = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_PICTURES':
            return { ...state, pictures: action.pictures };
        case 'UPDATE_PROFILE_PICTURE':
            return { ...state, profilePictureToUpload: action.profilePictureToUpload, profilePictureToRemove: action.profilePictureToRemove };
        case 'UPDATE_COMPETITIONS':
            return { ...state, competitions: action.competitions };
        case 'UPDATE_DOCUMENTS':
            return { ...state, documents: action.documents };
        case 'CLEAR_UPLOAD':
            return { ...initialState };
        default:
            return state;
    }
};

export default upload;
