import { NotificationService } from 'services';
import TransactionService from '../../services/TransactionService';

const TransactionTypes = {
    GET_TRANSACTIONS: 'GET_TRANSACTIONS',
    DELETE_TRANSACTION: 'DELETE_TRANSACTION',
    UPDATE_TRANSACTION: 'UPDATE_TRANSACTION',
    CREATE_TRANSACTION: 'CREATE_TRANSACTION',
    GET_TRANSACTION: 'GET_TRANSACTION',
};

export const getTransactions = (userId) => {
    function getTransactionsAction(transactions) {
        return { type: TransactionTypes.GET_TRANSACTIONS, transactions: transactions };
    }
    // when the backend call was failed
    function onFailure(error) {
        // error handling
        NotificationService.notify('error', 'Transactions Error', 'Error while retrieving the transactions.' +  error);
    }

    return async (dispatch) => {
        try {
            // ask for the pets in the backend
            let transactions = await TransactionService.getTransactions(userId);
            // call onSuccess in context of redux
            dispatch(getTransactionsAction(transactions));
        } catch (e) {
            onFailure(e);
        }
    };
};

export const deleteTransaction = (id, userId) => {
    const deleteTransactionAction = (transactions) => {
        return { type: TransactionTypes.DELETE_TRANSACTION, transactions: transactions };
    };
    const onFailure = (error) => {
        NotificationService.notify('error', 'Transactions Error', 'Error while deleting a transaction.');
    };

    return async (dispatch) => {
        try {
            await TransactionService.deleteTransaction(id);
            let transactions = await TransactionService.getTransactions(userId);
            dispatch(deleteTransactionAction(transactions));
        } catch (e) {
            onFailure(e);
        }
    };
};

export const createTransaction = (transaction, onSuccess = () => null, onError = (err) => null) => {
    const createTransactionAction = () => {
        onSuccess();
        return { type: TransactionTypes.CREATE_TRANSACTION, transaction: transaction };
    };
    const onFailure = (err) => {
        onError(err);
    };

    return async (dispatch) => {
        await TransactionService.createTransaction(transaction)
            .then(() => {
                dispatch(createTransactionAction());
            })
            .catch((e) => {
                onFailure(e);
            });
    };
};

export const updateTransaction = (transactionForUpdate, onSuccess = () => null, onError = (err) => null) => {
    const updateTransactionAction = (transaction) => {
        onSuccess();
        return { type: TransactionTypes.UPDATE_TRANSACTION, transaction: transaction };
    };

    const onFailure = (error) => {
        onError();
    };

    return async (dispatch) => {
        try {
            let transaction = await TransactionService.updateTransaction(transactionForUpdate);
            dispatch(updateTransactionAction(transaction));
        } catch (e) {
            onFailure(e);
        }
    };
};

export const getTransaction = (id) => {
    const getTransactionAction = (transaction) => {
        return { type: TransactionTypes.GET_TRANSACTION, transaction: transaction };
    };
    const onFailure = (error) => {
        NotificationService.notify('error', 'Transactions Error', 'Failed to load a transaction.');
    };

    return async (dispatch, getState) => {
        try {
            let transaction = await TransactionService.getTransaction(id);
            dispatch(getTransactionAction(transaction));
        } catch (e) {
            onFailure(e);
        }
    };
};