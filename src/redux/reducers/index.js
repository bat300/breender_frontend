import { combineReducers } from "redux";
import user from "./userReducer";
import entities from "./entitiesReducer";
import selectedMovie from "./selectedMovieReducer";
import selectedPet from "./selectedPetReducer";

export default combineReducers({
  user,
  entities,
  selectedMovie,
  selectedPet,
});
