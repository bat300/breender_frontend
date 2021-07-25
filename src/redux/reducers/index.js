import { combineReducers } from 'redux';
import user from './userReducer';
import checkUser from './checkUserReducer';
import pets from './petReducer';
import confirmation from './confirmationReducer';
import conversations from './conversationReducer';
import messages from './messageReducer';
import fetcher from './fetcherReducer';
import upload from './uploadReducer';
import documents from './documentReducer';

import transaction from './transactionReducer';

const reducers = combineReducers({
    user,
    checkUser,
    pets,
    documents,
    confirmation,
    conversations,
    messages,
    fetcher,
    upload,
    transaction,
});

const rootReducer = (state, action) => {
    // empty global state on logout
    if (action.type === 'LOGOUT') {
        window.localStorage.removeItem('persist:root');

        return reducers(undefined, action);
    }
    return reducers(state, action);
};

export default rootReducer;
