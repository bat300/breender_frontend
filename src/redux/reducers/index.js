import { combineReducers } from "redux";
import user from "./userReducer";
import entities from "./entitiesReducer";
import selectedMovie from "./selectedMovieReducer";
import confirmation from "./confirmationReducer";

export default combineReducers({
    user,
    entities,
    selectedMovie,
    confirmation
});
