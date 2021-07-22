import { NotificationService } from 'services';
import PetService from '../../services/PetService';

const PetTypes = {
    GET_PETS: 'GET_PETS',
    DELETE_PET: 'DELETE_PET',
    UPDATE_PET: 'UPDATE_PET',
    ADD_PET: 'ADD_PET',
    GET_PET: 'GET_PET',
    UPDATE_SELECTED_PET: 'UPDATE_SELECTED_PET',
    UPDATE_PROFILE_PICTURE: 'UPDATE_PROFILE_PICTURE',
    CLEAR_PET: 'CLEAR_PET'
};

export const getPets = (species, sex, breed, age, showOwn = false, user) => {
    // when the backend call was successfull and the pets are retrieved
    // in the dispatcher the pets will be added to the global state
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
            let pets = await PetService.getPets(species, sex, breed, age, showOwn, user);
            // call onSuccess in context of redux
            dispatch(onSuccess(pets));
        } catch (e) {
            onFailure(e);
            NotificationService.notify('error', 'Error', 'Retrieve of the pets failed. Please try again.')
        }
    };
};

export const deletePet = (id, onSuccess = () => null, onError = (err) => null) => {
    const deletePetAction = () => {
        onSuccess();
        return { type: PetTypes.DELETE_PET };
    };
    const onFailure = (error) => {
        onError();
        console.log('Error while deleting a pet', error);
    };

    return async (dispatch) => {
        try {
            let pet = await PetService.deletePet(id);
            dispatch(deletePetAction());
        } catch (e) {
            onFailure(e);
            NotificationService.notify('error', 'Deletion Error', 'During deletion occurred an error. Please try again.')
        }
    };
};

export const addPet = (pet, onSuccess = () => null, onError = (err) => null) => {
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
                NotificationService.notify('error', 'Error', 'Failed to add a new pet. Please try again.')
            });
    };
};

export const changePet = (changedPet, onSuccess = () => null, onError = (err) => null) => {
    const changePetAction = (pet) => {
        onSuccess();
        return { type: PetTypes.UPDATE_PET, pet: pet };
    };

    const onFailure = (error) => {
        onError();
    };

    return async (dispatch) => {
        try {
            let pet = await PetService.updatePet(changedPet);
            dispatch(changePetAction(pet));
        } catch (e) {
            onFailure(e);
            NotificationService.notify('error', 'Error', 'Failed to update the pet. Please try again.')
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
            NotificationService.notify('error', 'Error', 'Failed to get a pet. Please try again.')
        }
    };
};

export const updateSelectedPet = (pet) => {
    const updatePetAction = (pet) => {

        return { type: PetTypes.UPDATE_SELECTED_PET, pet: pet };
    };
    const onFailure = (error) => {
        console.log('Failed to update pet', error);
    };

    return async (dispatch, getState) => {
        try {
            dispatch(updatePetAction(pet));
        } catch (e) {
            onFailure(e);
        }
    };
};

export const clearPet = () => {
    const clearPetAction = () => {
        return { type: PetTypes.CLEAR_PET, pet: {} };
    };
    const onFailure = (error) => {
        console.log('Failed to clear a pet', error);
    };

    return async (dispatch, getState) => {
        try {
            dispatch(clearPetAction());
        } catch (e) {
            onFailure(e);
            NotificationService.notify('error', 'Error', 'Failed to clear a pet. Please try again.')
        }
    };
};