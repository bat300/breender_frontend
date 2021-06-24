import axios from 'axios';
import moment from 'moment';

class AxiosConfiguration {

    constructor() {
        this.cancelSource = axios.CancelToken.source();
        axios.defaults.baseURL = "http://localhost:4000";
    }

    setupInterceptors() {
        this.setupRequestInterceptor();
        this.setupResponseInterceptor();
    }

    // this should be called right after the login
    setNewCancelToken = () => (this.cancelSource = axios.CancelToken.source());

    getHeader = () => ({
<<<<<<< HEAD
        Authorization: 'Bearer ' + window.localStorage["jwtToken"],
=======
        Authorization: 'Bearer ' + localStorage["jwtToken"],
>>>>>>> 1ff72f4713e31191e3e23d235c6567416e510afd
        'Content-Type': 'application/json',
        'x-timezone-offset': moment().utcOffset(),
    });

    setupRequestInterceptor() {
        axios.interceptors.request.use(
            async (config: any) => {
<<<<<<< HEAD
                if (window.localStorage["jwtToken"] !== null) {
=======
                if (localStorage["jwtToken"] !== null) {
>>>>>>> 1ff72f4713e31191e3e23d235c6567416e510afd
                    config.headers = this.getHeader();
                }

                this.setNewCancelToken();
                config.cancelToken = this.cancelSource.token;
                return config;
            },
            (error) => Promise.reject(error)
        );
    }

    setupResponseInterceptor() {
        axios.interceptors.response.use(
            async (response) => {
                if (response && response.config.url && response.config.url?.indexOf('/logout') > -1) {
                    this.cancelSource.cancel('logout');
                }

                return response;
            },
            async (error) => {
                const originalRequest = error?.config;

                if (!error?.config || !error.config.url) {
                    return Promise.reject(error);
                }

                if (error.config.url === '/login') {
                    return Promise.reject(error);
                }

                return Promise.reject(error);
            }
        );
    }
}

export default new AxiosConfiguration();
