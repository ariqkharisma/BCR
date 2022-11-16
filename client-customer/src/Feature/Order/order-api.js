import axios from "axios";
import { getAuthHeader } from "../Auth/accessTokenHeader";

const API_URL = 'https://binar-rental.herokuapp.com/api/';

const getAllOrder = () => {
    return axios.get(`${API_URL}orders`, {
        headers: getAuthHeader(),
    })
}

const getOrderById = (id) => {
    return axios.get(`${API_URL}orders/${id}`, {
        headers: getAuthHeader(),
    })
} 

const postOrder = ({start_rent_at, finish_rent_at, car_id, user_id, car, user, status}) => {
    return axios.post(`${API_URL}orders`, {
        "data": {
          start_rent_at,
          finish_rent_at,
          car_id,
          user_id,
          car,
          user,
          status,          
        }
    }, {
        headers: getAuthHeader(),
    })
}

const updateOrder = (id, image) => {
    return axios.put(`${API_URL}orders/${id}`, {
        "data": {
          start_rent_at,
          finish_rent_at,
          car_id,
          user_id,
          slip: image,
          car,
          user,
          status,    
        }
    }, {
        headers: getAuthHeader(),
    })
}


const ordersAPI = {
    getAllOrder,
    getOrderById,
    postOrder,
    updateOrder
}

export default ordersAPI;