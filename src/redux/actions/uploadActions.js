const UploadTypes = {
    UPDATE_PICTURES: 'UPDATE_PICTURES',
    UPDATE_PROFILE_PICTURE: 'UPDATE_PROFILE_PICTURE',
    UPDATE_COMPETITIONS: 'UPDATE_COMPETITIONS',
    UPDATE_DOCUMENTS: 'UPDATE_DOCUMENTS',
    CLEAR_UPLOAD: 'CLEAR_UPLOAD',
};

export const updatePicturesToUpload = (pictures) => {
    const updatePictures = (pictures) => {
        return { type: UploadTypes.UPDATE_PICTURES, pictures: pictures };
    };
    const onFailure = (error) => {
        console.log('Failed to update pet', error);
    };

    return async (dispatch, getState) => {
        try {
            dispatch(updatePictures(pictures));
        } catch (e) {
            onFailure(e);
        }
    };
};

export const updateProfilePicture = (pictureToUpload, pictureToRemove) => {
    const updateProfilePictureAction = (toUpload, toRemove) => {
        return { type: UploadTypes.UPDATE_PROFILE_PICTURE, profilePictureToUpload: toUpload, profilePictureToRemove: toRemove };
    };
    const onFailure = (error) => {
        console.log('Failed to update profile picture', error);
    };

    return async (dispatch, getState) => {
        try {
            dispatch(updateProfilePictureAction(pictureToUpload, pictureToRemove));
        } catch (e) {
            onFailure(e);
        }
    };
};

export const updateDocumentsToUpload = (documents) => {
    const updateDocuments = (documents) => {
        return { type: UploadTypes.UPDATE_DOCUMENTS, documents: documents };
    };
    const onFailure = (error) => {
        console.log('Failed to update documents', error);
    };

    return async (dispatch, getState) => {
        try {
            dispatch(updateDocuments(documents));
        } catch (e) {
            onFailure(e);
        }
    };
};

export const updateCompetitionsToUpload = (competitions) => {
    const updateCompetitions = (documents) => {
        return { type: UploadTypes.UPDATE_COMPETITIONS, competitions: competitions };
    };
    const onFailure = (error) => {
        console.log('Failed to update competitions', error);
    };

    return async (dispatch, getState) => {
        try {
            dispatch(updateCompetitions(competitions));
        } catch (e) {
            onFailure(e);
        }
    };
};

export const clearUpload = () => {
    const clearUploadAction = () => {
        return { type: UploadTypes.CLEAR_UPLOAD };
    };
    const onFailure = (error) => {
        console.log('Failed to clear update', error);
    };

    return async (dispatch, getState) => {
        try {
            dispatch(clearUploadAction());
        } catch (e) {
            onFailure(e);
        }
    };
};
