import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ordersAPI from "./order-api";



export const orderGetById = createAsyncThunk('order/getById', 
    async (id) => {
        try {
            const { data } = await ordersAPI.getOrderById(id);
            return data;
        } catch (error) {
            console.log(error)
        }
    }
)

export const orderPost = createAsyncThunk('order/post', 
    async ({start_rent_at, finish_rent_at, status, car, user, car_id, user_id}) => {
        try {
            const { data } = await ordersAPI.postOrder({start_rent_at, finish_rent_at, status, car, user, car_id, user_id});
            return data
        } catch (error) {
            console.log(error)
        }
    }
)

const initialState = {order: null};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    extraReducers: {
        [orderGetById.fulfilled] : (state, action) => {
            state.order = action.payload.data;
        },
        [orderGetById.rejected] : (state, action) => {
            state.order = null;
        },
        [orderPost.fulfilled] : (state, action) => {
            state.order = action.payload.data;
        },
        [orderPost.rejected] : (state, action) => {
            state.order = null;
        }
    }
})

const { reducer } = orderSlice;
export default reducer;

