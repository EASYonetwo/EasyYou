import axios from 'axios';

//const USER_API_BASE_URL = 'http://183.101.134.54:8073/api/v1/users';
const USER_API_BASE_URL = 'http://172.30.1.13:8073/api/v1/users';

class UserService{
    getUsers(){
        return axios.get(USER_API_BASE_URL);
    }
}

export default new UserService();