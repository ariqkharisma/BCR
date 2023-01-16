import axios from "axios";

const API_URL = 'https://bcrserver-production.up.railway.app/api/';

const getCars = () => {
    return axios.get(`${API_URL}cars?populate=image`)
}

const getCarById = (id) => {
    return axios.get(`${API_URL}cars/${id}?populate=image`)
}

const filterCar = ({ name, category, price, isRented }) => {
    if (name, category, price, isRented) {
        return axios.get(`${API_URL}cars?populate=image&filters[name][$eqi]=${name}&filters[price][$lte]=${price}&filters[category][$eqi]=${category}&filters[isRented][$eqi]=${isRented}`)
    }
}

const carsAPI = {
    getCars,
    getCarById,
    filterCar
}

export default carsAPI;