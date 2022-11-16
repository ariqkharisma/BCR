import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ordersAPI from "./order-api";



export const orderGetAll = createAsyncThunk('order/getAll', 
    async () => {
        try {
            const { data } = await ordersAPI.getAllOrder();
            return data;
        } catch (error) {
            console.log(error);
        }
    }
)

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
    async ({start_rent_at, finish_rent_at, car_id, user_id, car, user, status}) => {
        try {
            const { data } = await ordersAPI.postOrder({start_rent_at, finish_rent_at, car_id, user_id, car, user, status});
            return data
        } catch (error) {
            console.log(error)
        }
    }
)

export const orderUpdate = createAsyncThunk('order/update', 
    async (id, image) => {
        try {
            const { data } = await ordersAPI.updateOrder(id, image);
            return data
        } catch (error) {
            console.log(error)
        }
    }
)

const initialState = {orders: [], order: null};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    extraReducers: {
        [orderGetAll.fulfilled] : (state, action) => {
            state.orders = action.payload.data
        },
        [orderGetById.rejected] : (state, action) => {
            state.orders = [];
        },
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
        },
        [orderUpdate.fulfilled] : (state, action) => {
            state.order = action.payload.data;
        },
        [orderUpdate.rejected] : (state, action) => {
            state.order = null;
        }
    }
})

const { reducer } = orderSlice;
export default reducer;

