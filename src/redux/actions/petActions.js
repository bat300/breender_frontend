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

export const getPets = (species, sex, breed, age) => {
    // when the backend call was successfull and the movies are retrieved
    // in the dispatcher the movies will be added to the global state
    function onSuccess(pets) {
        return { type: 'GETPETS_SUCCESS', pets: pets };
    }
    // when the backend call was failed
    function onFailure(error) {
        // error handling
        console.log('failed to get the pets', error);
    }

    return async (dispatch) => {
        try {
            // ask for the pets in the backend
            let pets = await PetService.getPets(species, sex, breed, age);
            // call onSuccess in context of redux
            dispatch(onSuccess(pets));
        } catch (e) {
            onFailure(e);
        }
    };
};

export const deletePet = (id) => {
    const deletePetAction = (pets) => {
        return { type: PetTypes.DELETE_PET, pets: pets };
    };
    const onFailure = (error) => {
        console.log('Error while deleting a pet', error);
    };

    return async (dispatch) => {
        try {
            await PetService.deletePet(id);
            let pets = await PetService.getPets();
            dispatch(deletePetAction(pets));
        } catch (e) {
            onFailure(e);
        }
    };
};

export const addPet = (pet, onSuccess, onError) => {
    const addPetAction = () => {
        onSuccess();
        return { type: PetTypes.ADD_PET };
    };
    const onFailure = (err) => {
        onError(err);
    };

    return async (dispatch) => {
        await PetService.createPet(pet)
            .then(() => {
                dispatch(addPetAction());
            })
            .catch((e) => {
                onFailure(e);
            });
    };
};

export const changePet = (changedPet) => {
    const changePetAction = (pet) => {
        return { type: PetTypes.UPDATE_PET, pet: pet };
    };

    const onFailure = (error) => {
        console.log('Error while changing a pet', error);
    };

    return async (dispatch) => {
        try {
            let pet = await PetService.updatePet(changedPet);
            dispatch(changePetAction(pet));
        } catch (e) {
            onFailure(e);
        }
    };
};

export const getPet = (id) => {
    const getPetAction = (pet) => {
        return { type: PetTypes.GET_PET, pet: pet };
    };
    const onFailure = (error) => {
        console.log('Failed to load a pet', error);
    };

    return async (dispatch, getState) => {
        try {
            let pet = await PetService.getPet(id);
            dispatch(getPetAction(pet));
        } catch (e) {
            onFailure(e);
        }
    };
};

export const updateProfilePicture = (profilePicture) => {
    const updateProfilePictureAction = (picture) => {
        return { type: PetTypes.UPDATE_PROFILE_PICTURE, profilePicture: picture };
    };
    const onFailure = (error) => {
        console.log('Failed to save profile picture', error);
    };

    return async (dispatch, getState) => {
        try {
            dispatch(updateProfilePictureAction(profilePicture));
        } catch (e) {
            onFailure(e);
        }
    };
};

export const updatePictures = (pictures) => {
    const updatePicturesAction = (pictures) => {
        return { type: PetTypes.UPDATE_PICTURES, pictures: pictures };
    };
    const onFailure = (error) => {
        console.log('Failed to save pictures', error);
    };

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
    };
    const onFailure = (error) => {
        console.log('Failed to save documents', error);
    };

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
    };
    const onFailure = (error) => {
        console.log('Failed to save competitions', error);
    };

    return async (dispatch, getState) => {
        try {
            dispatch(updateCompetitionAction(competitions));
        } catch (e) {
            onFailure(e);
        }
    };
};
