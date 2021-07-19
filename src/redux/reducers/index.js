import { combineReducers } from 'redux';
import user from './userReducer';
import entities from './entitiesReducer';
import selectedMovie from './selectedMovieReducer';
import pets from './petReducer';
import confirmation from './confirmationReducer';
import fetcher from './fetcherReducer';
import upload from './uploadReducer';

const reducers = combineReducers({
    user,
    entities,
    selectedMovie,
    pets,
    confirmation,
    fetcher,
    upload,
});

export default reducers;
