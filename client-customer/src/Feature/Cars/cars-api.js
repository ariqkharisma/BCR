import axios from "axios";

const API_URL = 'https://binar-rental.herokuapp.com/api/';

const getCars = () => {
    return axios.get(`${API_URL}cars?populate=image`)
}

const getCarById = (id) => {
    return axios.get(`${API_URL}cars/${id}?populate=image`)
}

const carsAPI = {
    getCars,
    getCarById,
}

export default carsAPI;