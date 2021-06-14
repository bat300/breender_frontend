import HttpService from "./HttpService";

export default class PetService {
    static baseURL() {
        return "http://localhost:4000/search";
    }

    static getPets(species, sex, breed, age) {
        return new Promise(async (resolve, reject) => {
            HttpService.get(
                `${PetService.baseURL()}?species=${species}&sex=${sex}&breed=${breed}&age[]=${age}`,
                function (data) {
                    console.log(data)
                    if (data !== undefined || Object.keys(data).length !== 0) {
                        resolve(data);
                    } else {
                        reject("Error while retrieving pets");
                    }
                },
                function (textStatus) {
                    reject(textStatus);
                }
            );
        });
    }
}