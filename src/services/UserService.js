import HttpService from './HttpService';

export default class UserService {
    static baseURL() {
        return 'http://localhost:4000/auth';
    }
    static baseUserURL() {
        return 'http://localhost:4000/user';
    }

    static register(email, user, pass, city, province, isAdmin, subscriptionPlan, paymentPlan, paymentMethod) {
        return new Promise((resolve, reject) => {
            HttpService.post(
                `${UserService.baseURL()}/register`,
                {
                    username: user,
                    password: pass,
                    isAdmin: isAdmin,
                    email: email,
                    city: city,
                    province: province,
                    subscriptionPlan: subscriptionPlan,
                    paymentPlan: paymentPlan,
                    paymentMethod: paymentMethod

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

    static checkUser(email, username, isAdmin) {
        return new Promise((resolve, reject) => {
            HttpService.get(
                `${UserService.baseURL()}/checkUser/${email}/${username}/${isAdmin}`,
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

    static confirmEmail(email, token) {
        return new Promise((resolve, reject) => {
            HttpService.get(
                `${UserService.baseURL()}/confirmation/${email}/${token}`,
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
        return new Promise((resolve, reject) => {
            HttpService.post(
                `${UserService.baseURL()}/login`,
                {
                    username: user,
                    password: pass,
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

    static logout() {
        window.localStorage.removeItem('jwtToken');
    }

    static update(id, subscriptionPlan, paymentPlan, paymentMethod) {
        return new Promise((resolve, reject) => {
            HttpService.post(
                `${UserService.baseURL()}/update`,
                {
                    id: id,
                    subscriptionPlan: subscriptionPlan,
                    paymentPlan: paymentPlan,
                    paymentMethod: paymentMethod
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

    static getUsersInfo(id) {
        return new Promise(async (resolve, reject) => {
            HttpService.get(
                `${UserService.baseUserURL()}/${id}`,
                function (data) {
                    if (data !== undefined || Object.keys(data).length !== 0) {
                        resolve(data);
                    } else {
                        reject("Error while retrieving user");
                    }
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

    static updateUser(user) {
        return new Promise((resolve, reject) => {
            HttpService.put(
                `${this.baseUserURL()}/${user._id}`,
                user,
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

    static getUserPets(ownerId) {
        return new Promise((resolve, reject) => {
            HttpService.get(
                `${this.baseUserURL()}/pets/${ownerId}`,
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

    static getReviewsOnUser(id) {
        return new Promise((resolve, reject) => {
            HttpService.get(
                `${this.baseUserURL()}/${id}/reviews`,
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }
}
