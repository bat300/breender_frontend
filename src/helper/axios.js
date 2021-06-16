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
        'Authorization': 'Bearer ' + localStorage["jwtToken"],
        'Content-Type': 'application/json',
        'x-timezone-offset': moment().utcOffset(),
    });

    setupRequestInterceptor() {
        axios.interceptors.request.use(
            async (config: any) => {
                if (localStorage["jwtToken"] !== null) {
                    config.headers = this.getHeader();
                }
                console.log(config.headers)

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
