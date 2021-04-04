import axios from "axios";
import {API_URL} from "../../Constants";

class HelloWorldService {

    executeHelloWorldService() {
        console.log('ping')
        return axios.get(`${API_URL}/bean/abcd`)
    }

    executeHelloWorldServiceName(name) {
        console.log('ping')
        return axios.get(`${API_URL}/bean/${name}`);
    }
}

export default new HelloWorldService();