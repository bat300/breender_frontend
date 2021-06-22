import { combineReducers } from 'redux';
import user from './userReducer';
import entities from './entitiesReducer';
import selectedMovie from './selectedMovieReducer';
import pets from './petReducer';

const reducers = combineReducers({
    user,
    entities,
    selectedMovie,
    pets,
});

export default reducers;