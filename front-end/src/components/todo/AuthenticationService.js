import axios from "axios";
import {API_URL} from "../../Constants";

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';

class AuthenticationService {

    executeBasicAuthenticationService(username, password) {
        return axios.get(`${API_URL}/basicauth`, {
            headers: {
                authorization: this.createBasicAuthToken(username, password)
            }
        });
    }

    registerSuccessfulLogin(username, password) {
        console.log('registerSuccessfulLogin')
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password));
    }

    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username + ":" + password);
    }

    executeJwtAuthenticationService(username, password) {
        return axios.post(`${API_URL}/authenticate`, {
            username,
            password
        });
    }

    registerSuccessfulLoginForJwt(username, token) {
        console.log('token is [' + token + ']');
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        this.setupAxiosInterceptors(this.createJwtAuthToken(token));
    }

    createJwtAuthToken(token) {
        return 'Bearer ' + token;
    }

    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);

    }

    isUserLogin() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        return user !== null;
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) {
            return '';
        }
        return user;
    }

    setupAxiosInterceptors(token) {
        axios.interceptors.request.use((config) => {
            if (this.isUserLogin()) {
                config.headers.authorization = token
            }
            return config;
        })
    }

}

export default new AuthenticationService();