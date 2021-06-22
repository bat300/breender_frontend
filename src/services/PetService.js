import axios from 'axios';

export default class PetService {
    static URL() {
        return 'http://localhost:4000/pets';
    }

    static getPets() {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await axios.get(`/pets/`);
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
