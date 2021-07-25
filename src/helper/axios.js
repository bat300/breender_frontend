import axios from 'axios';
import moment from 'moment';

class AxiosConfiguration {
    constructor() {
        this.cancelSource = axios.CancelToken.source();
        axios.defaults.baseURL = 'http://localhost:4000';
    }

    setupInterceptors() {
        this.setupRequestInterceptor();
        this.setupResponseInterceptor();
    }

    // this should be called right after the login
    setNewCancelToken = () => (this.cancelSource = axios.CancelToken.source());

    getHeader = () => ({
        Authorization: 'Bearer ' + localStorage['jwtToken'],
        'Content-Type': 'application/json',
        'x-timezone-offset': moment().utcOffset(),
    });

    setupRequestInterceptor() {
        axios.interceptors.request.use(
            async (config: any) => {
                if (localStorage['jwtToken'] !== null) {
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
                return response;
            },
            async (error) => {
                return Promise.reject(error.response);
            }
        );
    }
}

export default new AxiosConfiguration();
