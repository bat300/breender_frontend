export default class HttpService {
    static extractUser(token) {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-', '+').replace('_', '/');
        let userJson = JSON.parse(atob(base64));
        return {
            id: userJson._id,
            username: userJson.username,
            role: userJson.role,
            subscriptionPlan: userJson.subscriptionPlan
        };
    }

    static async get(url, onSuccess, onError) {
        let token = window.localStorage['jwtToken'];
        let header = new Headers();
        if (token) {
            header.append('Authorization', `JWT ${token}`);
        }

        try {
            let resp = await fetch(url, {
                method: 'GET',
                headers: header,
            });

            if (this.checkIfUnauthorized(resp)) {
                window.location = '/login';
            } else {
                resp = await resp.json();
            }

            if (resp.error) {
                onError(resp.error);
            } else {
                if (resp.hasOwnProperty('token')) {
                    window.localStorage['jwtToken'] = resp.token;
                    resp.user = this.extractUser(resp.token);
                }
                onSuccess(resp);
            }
        } catch (err) {
            onError(err.message);
        }
    }

    static async put(url, data, onSuccess, onError) {
        let token = window.localStorage['jwtToken'];
        let header = new Headers();
        if (token) {
            header.append('Authorization', `JWT ${token}`);
        }
        header.append('Content-Type', 'application/json');

        try {
            let resp = await fetch(url, {
                method: 'PUT',
                headers: header,
                body: JSON.stringify(data),
            });

            if (this.checkIfUnauthorized(resp)) {
                window.location = '/login';
                return;
            } else {
                resp = await resp.json();
            }

            if (resp.error) {
                onError(resp.error);
            } else {
                if (resp.hasOwnProperty('token')) {
                    window.localStorage['jwtToken'] = resp.token;
                    resp.user = this.extractUser(resp.token);
                }
                onSuccess(resp);
            }
        } catch (err) {
            onError(err.message);
        }
    }

    static async post(url, data, onSuccess, onError) {
        let token = window.localStorage['jwtToken'];
        let header = new Headers();
        if (token) {
            header.append('Authorization', `JWT ${token}`);
        }
        header.append('Content-Type', 'application/json');

        try {
            let resp = await fetch(url, {
                method: 'POST',
                headers: header,
                body: JSON.stringify(data),
            });

            if (this.checkIfUnauthorized(resp)) {
                //show error and do not redirect to login page when user tried to log in
                url === 'http://localhost:4000/auth/login' ? onError('This password is incorrect. Please double-check it.') : (window.location = '/login');
                return;
            } else {
                resp = await resp.json();
            }

            if (resp.error) {
                onError(resp.error);
            } else {
                if (resp.hasOwnProperty('token')) {
                    window.localStorage['jwtToken'] = resp.token;
                    resp.user = this.extractUser(resp.token);
                }
                onSuccess(resp);
            }
        } catch (err) {
            onError(err.message);
        }
    }

    static async remove(url, onSuccess, onError) {
        let token = window.localStorage['jwtToken'];
        let header = new Headers();
        if (token) {
            header.append('Authorization', `JWT ${token}`);
        }

        try {
            let resp = await fetch(url, {
                method: 'DELETE',
                headers: header,
            });

            if (this.checkIfUnauthorized(resp)) {
                window.location = '/login';
                return;
            } else {
                resp = await resp.json();
            }

            if (resp.error) {
                onError(resp.error);
            } else {
                onSuccess(resp);
            }
        } catch (err) {
            onError(err.message);
        }
    }

    static checkIfUnauthorized(res) {
        if (res.status === 401) {
            return true;
        }
        return false;
    }
}
