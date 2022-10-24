import axios from "axios";

const API_URL = 'https://binar-rental.herokuapp.com/api/';

const getCars = () => {
    return axios.get(`${API_URL}cars`)
}

const getCarById = (id) => {
    return axios.get(`${API_URL}cars/${id}`)
}

const carsAPI = {
    getCars,
    getCarById,
}

export default carsAPI;