import PetService from "../../services/PetService";

export function getPets() {
  // when the backend call was successfull and the pets are retrieved
  // in the dispatcher the pets will be added to the global state
  function onSuccess(pets) {
    return { type: "GETMOVIES_SUCCESS", pets: pets };
  }
  // when the backend call was failed
  function onFailure(error) {
    // error handling
    console.log("failed to get the pets", error);
  }

  return async (dispatch) => {
    try {
      // ask for the pets in the backend
      let pets = await PetService.getPets();
      // call onSuccess in context of redux
      dispatch(onSuccess(pets));
    } catch (e) {
      onFailure(e);
    }
  };
}

export const getPet = (id) => {
  function onSuccess(pet) {
    return { type: "GETMOVIE_SUCCESS", pet: pet };
  }
  function onFailure(error) {
    console.log("failed to load a pet", error);
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
