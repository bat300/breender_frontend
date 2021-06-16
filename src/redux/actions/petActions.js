import PetService from "../../services/PetService";

export const getPet = (id) => {
  function onSuccess(pet) {
    return { type: "GETPET_SUCCESS", pet: pet };
  }
  function onFailure(error) {
    console.log("failed to load a pet", error);
  }

  return async (dispatch) => {
    try {
      let pet = await PetService.getPet(id);
      dispatch(onSuccess(pet));
    } catch (e) {
      onFailure(e);
    }
  };
};
