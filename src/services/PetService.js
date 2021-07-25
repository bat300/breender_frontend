import axios from 'axios';

export default class PetService {
    static URL() {
        return 'http://localhost:4000/pets';
    }

    static setToken() {
        const token = localStorage.getItem('jwtToken');
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }

    static getPets(species, sex, breed, age, page, showOwn, user) {
        this.setToken();
        return new Promise(async (resolve, reject) => {
            try {
                const me = `user=${user?.id ? user.id : ''}`;
                const { data } = await axios.get(`/pets/search?${me}&species=${species}&sex=${sex}&breed=${breed}&age[]=${age}&page=${page}&showOwn=${showOwn}`);
                resolve(data);
            } catch (err) {
                reject(err);
            }
        });
    }

    static getPet(id) {
        this.setToken();
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
        this.setToken();
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await axios.delete(`/pets/${id}`);
                resolve(data);
            } catch (err) {
                reject(err);
            }
        });
    }

    static async updatePet(pet) {
        this.setToken();
        const { data } = await axios.put(`/pets/${pet.id}`, pet);
        return data;
    }

    static async createPet(pet) {
        this.setToken();
        const { data } = await axios.post(`/pets/`, pet);
        return data;
    }
}
