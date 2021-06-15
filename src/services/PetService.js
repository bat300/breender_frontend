import HttpService from "./HttpService";

export default class PetService {

    URL = process.env.API_URL + 'pets';

    static getPets() {
        return new Promise(async (resolve, reject) => {
            HttpService.get(
                URL,
                function (data) {
                    resolve(data);
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }

    static getPet(id) {
        return new Promise(async (resolve, reject) => {
            HttpService.get(
                `${URL}/${id}`,
                function (data) {
                    if (data !== undefined || Object.keys(data).length !== 0) {
                        resolve(data);
                    } else {
                        reject("Error while retrieving a pet");
                    }
                },
                function (data) {
                    reject(data);
                }
            );
        });
    }

    static deletePet(id) {
        return new Promise((resolve, reject) => {
            HttpService.remove(
                `${URL}/${id}`,
                function (data) {
                    if (data.message !== undefined) {
                        resolve(data.message);
                    } else {
                        reject("Error while deleting a pet");
                    }
                },
                function (data) {
                    reject(data);
                }
            );
        });
    }

    static updatePet(pet) {
        return new Promise((resolve, reject) => {
            HttpService.put(
                `${URL}/${pet._id}`,
                pet,
                function (data) {
                    resolve(data);
                },
                function (data) {
                    reject(data);
                }
            );
        });
    }

    static createPet(pet) {
        pet.id = Math.floor(Math.random() * 100000000 + 1).toString();

        return new Promise((resolve, reject) => {
            HttpService.post(
                URL,
                pet,
                function (data) {
                    resolve(data);
                },
                function (data) {
                    reject(data);
                }
            );
        });
    }
}
