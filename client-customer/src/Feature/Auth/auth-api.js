import axios from "axios";


const API_URL = 'https://binar-rental.herokuapp.com/api/';


const register = ({username, email, password}) => {
    return axios.post(`${API_URL}auth/local/register`, {
        username,
        email,
        password,
    })
}

const login = ({identifier, password}) => {
    return axios.post(`${API_URL}auth/local`, {
        identifier, 
        password,
    })
    .then((res) => {
        if (res.data) {
            localStorage.setItem('user', JSON.stringify(res.data))
        }
        return res;
    })
}

const logout = () => {
    localStorage.removeItem('user');
}

const authAPI = {
    register,
    login,
    logout,
}


export default authAPI;

