import HttpService from "./HttpService";

export default class PetService {
  static baseURL() {
    return "http://localhost:4000/pets";
  }

  static getPet(id) {
    return new Promise(async (resolve, reject) => {
      HttpService.get(
        `${this.baseURL()}/${id}`,
        function (data) {
          if (data !== undefined || Object.keys(data).length !== 0) {
            resolve(data);
          } else {
            reject("Error while retrieving pet");
          }
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }
}
