import axios from 'axios';

export default class ConversationService {
    static URL() {
        return 'http://localhost:4000/conversations';
    }

    static getConversations(userId) {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await axios.get(`/conversations/${userId}`);
                resolve(data);
            } catch (err) {
                reject(err);
            }
        });
    }

    static getConversation(id1, id2) {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await axios.get(`/conversations/find/${id1}&${id2}`);
                resolve(data);
            } catch (err) {
                reject(err);
            }
        });
    }

    static async createConversation(conversation) {
        const { data } = await axios.post(`/conversations/`, conversation);
        return data;
    }

    static async getOrCreateConversation(id1, id2) {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await axios.get(`/conversations/find/${id1}&${id2}`);
                console.log(JSON.stringify(data));
                resolve(data);
            } catch (err) {
                console.log('Creating now....');
                let conversation = {
                    members: [id1, id2],
                };
                const { data } = await axios.post(`/conversations/`, conversation);
                resolve(data);
            }
        });
    }
}
