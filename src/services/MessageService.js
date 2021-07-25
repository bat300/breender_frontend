import axios from 'axios';

export default class MessageService {
    static URL() {
        return 'http://localhost:4000/messages';
    }

    static getMessages(conversationId) {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await axios.get(`/messages/${conversationId}`);
                resolve(data);
            } catch (err) {
                reject(err);
            }
        });
    }

    static updateMessagesToSeen(messageIds) {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await axios.put(`/messages/`, { messagesToUpdate: messageIds });
                resolve(data);
            } catch (err) {
                reject(err);
            }
        });
    }

    static getUnseenMessages(userId) {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await axios.get(`/messages/unseen/${userId}`);
                resolve(data);
            } catch (err) {
                reject(err);
            }
        });
    }

    static async createMessage(message) {
        const { data } = await axios.post(`/messages/`, message);
        return data;
    }
}
