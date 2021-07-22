import axios from 'axios';

export default class TransactionService {
    static URL() {
        return 'http://localhost:4000/transaction';
    }

    static setToken() {
        const token = localStorage.getItem('jwtToken');
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }

    static getTransactions(userId) {
        this.setToken();
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await axios.get(`/transaction/`, { params: { userId } });
                resolve(data);
            } catch (err) {
                reject(err);
            }
        });
    }

    static getAdminTransactions(userId) {
        this.setToken();
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await axios.get(`/transaction/all/`, { params: { userId } });
                resolve(data);
            } catch (err) {
                reject(err);
            }
        });
    }

    static getTransaction(id) {
        this.setToken();
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await axios.get(`/transaction/${id}`);
                resolve(data);
            } catch (err) {
                reject(err);
            }
        });
    }

    static deleteTransaction(id) {
        this.setToken();
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await axios.delete(`/transaction/${id}`);
                resolve(data);
            } catch (err) {
                reject(err);
            }
        });
    }

    static async updateTransaction(transaction) {
        this.setToken();
        const { data } = await axios.put(`/transaction/${transaction.id}`, transaction);
        return data;
    }

    static async createTransaction(transaction) {
        this.setToken();
        const { data } = await axios.post(`/transaction/`, transaction);
        return data;
    }
}
