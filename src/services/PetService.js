import HttpService from "./HttpService";

export default class MovieService {
  static baseURL() {
    return "http://localhost:4000/pets";
  }

  static getPets() {
    return new Promise(async (resolve, reject) => {
      HttpService.get(
        this.baseURL(),
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
        `${this.baseURL()}/${id}`,
        function (data) {
          if (data !== undefined || Object.keys(data).length !== 0) {
            resolve(data);
          } else {
            reject("Error while retrieving movie");
          }
        },
        function (textStatus) {
          reject(textStatus);
        }
      );
    });
  }
}
