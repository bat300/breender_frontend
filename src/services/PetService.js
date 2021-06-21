import axios from "axios";

export default class PetService {
  static baseURL() {
    return "http://localhost:4000/pets";
  }

  static getPet(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await axios.get(`/pets/${id}`);
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }
}
