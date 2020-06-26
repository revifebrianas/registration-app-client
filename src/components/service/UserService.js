import axios from "axios";

const UserService = {

    registerUser(newUser) {
        return axios({
            method: 'post',
            url: 'http://localhost:8089/user/register',
            timeout: 5000,
            data: newUser
        })
    }

};

export default UserService;