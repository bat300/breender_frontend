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

    static setConversations() {
        console.log('Set convo TODO');
    }
}
