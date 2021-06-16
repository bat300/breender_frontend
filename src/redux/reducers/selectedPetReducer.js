export default function selectedPet(state = {}, action) {
  switch (action.type) {
    case "GETMOVIE_SUCCESS":
      return { pet: action.pet };
    case "GETMVOVIE_ERROR":
      return { error: action.error };
    case "CHANGE_SELECTED_MOVIE":
      return {
        pet: {
          ...state.pet,
          ...action.updates,
        },
      };
    default:
      return { pet: action.pet };
  }
}
