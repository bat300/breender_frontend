import PetService from "../../services/PetService";

export function getPets(species, sex, breed, age) {
    // when the backend call was successfull and the movies are retrieved
    // in the dispatcher the movies will be added to the global state
    function onSuccess(pets) {
        return { type: "GETPETS_SUCCESS", pets: pets };
    }
    // when the backend call was failed
    function onFailure(error) {
        // error handling
        console.log("failed to get the pets", error);
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
}