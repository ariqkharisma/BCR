import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setLoading } from '../Auth/message-slice'
import carsAPI from "./cars-api";



export const carsGetAll = createAsyncThunk('cars/getAll', 
    async () => {
        try {
            const { data } = await carsAPI.getCars();
            return data;
        } catch (error) {
            console.log(error)
        }
    }
)

export const carsGetById = createAsyncThunk('cars/getById', 
    async (id) => {
        try {
            const { data } = await carsAPI.getCarById(id);
            return data;
        } catch (error) {
            console.log(error);
        }
    }
)

const initialState = {cars: [], car: null};

const carsSlice = createSlice({
    name: 'cars',
    initialState,
    extraReducers: {
        [carsGetAll.fulfilled] : (state, action) => {
            state.cars = action.payload.data;
        },
        [carsGetAll.rejected] : (state, action) => {
            state.cars = [];
        },
        [carsGetById.fulfilled] : (state, action) => {
            state.car = action.payload.data;
        },
        [carsGetById.rejected] : (state, action) => {
            state.car = null;
        }
    }
})

const { reducer } = carsSlice;
export default reducer;