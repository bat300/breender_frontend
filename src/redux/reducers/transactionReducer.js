const initialState = {
    transaction: undefined,
    transactions: [],
};

const TransactionTypes = {
    GET_TRANSACTIONS: 'GET_TRANSACTIONS',
    DELETE_TRANSACTION: 'DELETE_TRANSACTION',
    UPDATE_TRANSACTION: 'UPDATE_TRANSACTION',
    CREATE_TRANSACTION: 'CREATE_TRANSACTION',
    GET_TRANSACTION: 'GET_TRANSACTION',
};

const transaction = (state = initialState, action) => {
    switch (action.type) {
        case TransactionTypes.GET_TRANSACTIONS:
            return { ...state, transactions: action.transactions };
        case TransactionTypes.DELETE_TRANSACTION:
            return { ...state, transactions: action.transactions };
        case TransactionTypes.CREATE_TRANSACTION:
            return { ...state };
        case TransactionTypes.UPDATE_TRANSACTION:
            return { ...state, transaction: action.transaction };
        case TransactionTypes.GET_TRANSACTION:
            return { ...state, transaction: action.transaction };
        default:
            return state;
    }
};

export default transaction;
