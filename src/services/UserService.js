import HttpService from './HttpService';
import axios from 'axios';

export default class UserService {
    static baseURL() {
        return 'http://localhost:4000/auth';
    }

    static extractUser(token) {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-', '+').replace('_', '/');
        let userJson = JSON.parse(atob(base64));
        return {
                id: userJson._id,
                username: userJson.username,
                role: userJson.role,
        };
    }

    static register(user, pass, isAdmin) {
        return new Promise((resolve, reject) => {
            HttpService.post(
                `${UserService.baseURL()}/register`,
                {
                    username: user,
                    password: pass,
                    isAdmin: isAdmin,
                },
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

    static login(user, pass) {
        return new Promise(async (resolve, reject) => { 
            try {
                const loginData = { username: user, password: pass };
                const { data } = await axios.post(`/auth/login/`, loginData);
                let userData = {};

                if (data.hasOwnProperty('token')) {
                    window.localStorage['jwtToken'] = data.token;
                    userData = this.extractUser(data.token);
                    console.log(userData);
                }

                resolve(userData);
            } catch (err) {
                reject(err);
            }
        });
    }

    static logout() {
        localStorage.removeItem('jwtToken');
    }
}
