import axios from "axios";
import { getAuthHeader } from "../Auth/accessTokenHeader";

const API_URL = 'https://binar-rental.herokuapp.com/api/';

const getOrderById = (id) => {
    return axios.get(`${API_URL}orders/${id}`, {
        headers: getAuthHeader(),
    })
} 

const postOrder = ({start_rent_at, finish_rent_at, status, car, user, car_id, user_id}) => {
    return axios.post(`${API_URL}orders`, {
        "data": {
          start_rent_at,
          finish_rent_at,
          status,
          car,
          user,
          car_id,
          user_id
        }
    }, {
        headers: getAuthHeader(),
    })
}


const ordersAPI = {
    getOrderById,
    postOrder
}

export default ordersAPI;