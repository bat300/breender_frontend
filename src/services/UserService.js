import HttpService from "./HttpService";
import jsonwebtoken from "jsonwebtoken"

export default class UserService {
  static baseURL() {
    return "http://localhost:4000/auth";
  }

  static register(email, user, pass, city, isAdmin) {
    return new Promise((resolve, reject) => {
      HttpService.post(
        `${UserService.baseURL()}/register`,
        {
          username: user,
          password: pass,
          isAdmin: isAdmin,
          email: email,
          city: city,
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

  static confirmEmail(email, token) {
    return new Promise((resolve, reject) => {
      HttpService.get(
        `${UserService.baseURL()}/confirmation/${email}/${token}`,
        {
          email: email,
          token: token,
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
    window.localStorage.removeItem("jwtToken");
  }
}
