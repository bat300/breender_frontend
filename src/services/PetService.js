<<<<<<< HEAD
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
=======
import axios from 'axios';

export default class PetService {
    static URL() {
        return 'http://localhost:4000/pets';
    }

    static getPets(species, sex, breed, age) {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await axios.get(`/pets/search?species=${species}&sex=${sex}&breed=${breed}&age[]=${age}`);
                resolve(data);
            } catch (err) {
                reject(err);
            }
        });
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

    static deletePet(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await axios.delete(`/pets/${id}`);
                resolve(data);
            } catch (err) {
                reject(err);
            }
        });
    }

    static updatePet(pet) {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await axios.put(`/pets/${pet._id}`, pet);
                resolve(data);
            } catch (err) {
                reject(err);
            }
        });
    }

    static async createPet(pet) {
        const { data } = await axios.post(`/pets/`, pet);
        return data;
    }
}
>>>>>>> 1ff72f4713e31191e3e23d235c6567416e510afd
