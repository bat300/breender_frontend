import { combineReducers } from 'redux';
import user from './userReducer';
import checkUser from './checkUserReducer';
import entities from './entitiesReducer';
import selectedMovie from './selectedMovieReducer';
import selectedPet from './selectedPetReducer';
import pets from './petReducer';
import confirmation from './confirmationReducer';
import documents from './documentReducer';
import transaction from './transactionReducer';

const reducers = combineReducers({
    user,
    checkUser,
    entities,
    selectedMovie,
    selectedPet,
    pets,
    documents,
    confirmation,
    transaction,
});

const rootReducer = (state, action) => {
    // empty global state on logout
    if (action.type === 'LOGOUT') {
        window.localStorage.removeItem('persist:root')

        return reducers(undefined, action);
    }
    return reducers(state, action);
};

export default rootReducer;
