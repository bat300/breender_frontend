import PetService from '../../services/PetService';

const PetTypes = {
    GET_PETS: 'GET_PETS',
    DELETE_PET: 'DELETE_PET',
    UPDATE_PET: 'UPDATE_PET',
    ADD_PET: 'ADD_PET',
    GET_PET: 'GET_PET',
    UPDATE_PROFILE_PICTURE: 'UPDATE_PROFILE_PICTURE',
    UPDATE_PICTURES: 'UPDATE_PICTURES',
    UPDATE_DOCUMENTS: 'UPDATE_DOCUMENTS',
    UPDATE_COMPETITIONS: 'UPDATE_COMPETITIONS',
};

export function getPets() {
    // when the backend call was successfull and the pets are retrieved
    // in the dispatcher the pets will be added to the global state
    function onSuccess(pets) {
        return { type: PetTypes.GET_PETS, pets: pets };
    }

    function onFailure(error) {
        // error handling
        console.log('Failed to get the pets', error);
    }

    return async (dispatch) => {
        try {
            // get pets from the backend
            let pets = await PetService.getPets();
            // call onSuccess in context of redux
            dispatch(onSuccess(pets));
        } catch (e) {
            onFailure(e);
        }
    };
}

export function deletePet(id) {
    function onSuccess(pets) {
        return { type: PetTypes.DELETE_PET, pets: pets };
    }
    function onFailure(error) {
        console.log('Error while deleting a pet', error);
    }

    return async (dispatch) => {
        try {
            await PetService.deletePet(id);
            let pets = await PetService.getPets();
            dispatch(onSuccess(pets));
        } catch (e) {
            onFailure(e);
        }
    };
}

export function addPet(pet) {
    function onSuccess() {
        return { type: PetTypes.ADD_PET };
    }
    function onFailure(error) {
        console.log('Error while adding a pet', error);
    }

    return async (dispatch) => {
        try {
            await PetService.createPet(pet);
            dispatch(onSuccess());
        } catch (e) {
            onFailure(e);
        }
    };
}

export function changePet(changedPet) {
    function onSuccess(pet) {
        return { type: PetTypes.UPDATE_PET, pet: pet };
    }

    function onFailure(error) {
        console.log('Error while changing a pet', error);
    }

    return async (dispatch) => {
        try {
            let pet = await PetService.updatePet(changedPet);
            dispatch(onSuccess(pet));
        } catch (e) {
            onFailure(e);
        }
    };
}

export const getPet = (id) => {
    function onSuccess(pet) {
        return { type: PetTypes.GET_PET, pet: pet };
    }
    function onFailure(error) {
        console.log('Failed to load a pet', error);
    }

    return async (dispatch, getState) => {
        try {
            let pet = await PetService.getPet(id);
            dispatch(onSuccess(pet));
        } catch (e) {
            onFailure(e);
        }
    };
};

export const updateProfilePicture = (profileUrl) => {

    const updateProfilePictureAction = (url) => {
        return { type: PetTypes.UPDATE_PROFILE_PICTURE, profileUrl: profileUrl };
    }
    const onFailure = (error) => {
        console.log('Failed to save profile picture', error);
    }

    return async (dispatch, getState) => {
        try {
            dispatch(updateProfilePictureAction(profileUrl));
        } catch (e) {
            onFailure(e);
        }
    };
};

export const updatePictures = (pictures) => {

    const updatePicturesAction = (pictures) => {
        return { type: PetTypes.UPDATE_PICTURES, pictures: pictures };
    }
    const onFailure = (error) => {
        console.log('Failed to save pictures', error);
    }

    return async (dispatch, getState) => {
        try {
            dispatch(updatePicturesAction(pictures));
        } catch (e) {
            onFailure(e);
        }
    };
};

export const updateDocuments = (documents) => {

    const updateDocsAction = (documents) => {
        return { type: PetTypes.UPDATE_DOCUMENTS, documents: documents };
    }
    const onFailure = (error) => {
        console.log('Failed to save documents', error);
    }

    return async (dispatch, getState) => {
        try {
            dispatch(updateDocsAction(documents));
        } catch (e) {
            onFailure(e);
        }
    };
};

export const updateCompetitions = (competitions) => {

    const updateCompetitionAction = (competitions) => {
        return { type: PetTypes.UPDATE_COMPETITIONS, competitions: competitions };
    }
    const onFailure = (error) => {
        console.log('Failed to save competitions', error);
    }

    return async (dispatch, getState) => {
        try {
            dispatch(updateCompetitionAction(competitions));
        } catch (e) {
            onFailure(e);
        }
    };
};


