import { combineReducers } from 'redux';
import user from './userReducer';
import entities from './entitiesReducer';
import selectedMovie from './selectedMovieReducer';
import selectedPet from './selectedPetReducer';
import pets from './petReducer';
import confirmation from './confirmationReducer';

const reducers = combineReducers({
    user,
    entities,
    selectedMovie,
    selectedPet,
    pets,
    confirmation,
});

export default reducers;
