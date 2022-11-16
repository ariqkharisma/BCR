import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import authAPI from './auth-api';
import thunk from 'redux-thunk';
import { setMessage } from './message-slice';

const user = JSON.parse(localStorage.getItem("user"));

export const authRegister = createAsyncThunk('auth/register',
    async ({username, email, password}, thunkAPI) => {
        try {
            const response = await authAPI.register({username, email, password});
            thunkAPI.dispatch(setMessage('akun berhasil dibuat'));
        } catch (error) {
            const message = (
                error.response && error.response.data && error.response.data.message) ||
                error.message || error.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
)

export const authLogin = createAsyncThunk('auth/login', 
    async({identifier, password}, thunkAPI) => {
        try {
            const response = await authAPI.login({identifier, password});
            thunkAPI.dispatch(setMessage('berhasil login'));
            return {user: response.data};            
        } catch (err) {
            const message = (
                err.response && err.response.data && err.response.data.message) ||
                err.message || err.toString();
            thunkAPI.dispatch(setMessage(message));
            return thunkAPI.rejectWithValue();
        }
    }
)

export const authLogout = createAsyncThunk('auth/logout', 
    async() => {
        await authAPI.logout();
    }
)

const initialState = user ? {isLoggedIn : true, user} : {isLoggedIn : false, user : null};

const authSlice = createSlice({
    name : "auth",
    initialState,
    extraReducers : {
        [authRegister.fulfilled] : (state, action) => {
            state.isLoggedIn = false;
        },
        [authRegister.rejected] : (state, action) => {
            state.isLoggedIn = false;
        },
        [authLogin.fulfilled] : (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload.user;
        },
        [authLogin.rejected] : (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
        },
        [authLogout.fulfilled] : (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
        },
    },

});

const {reducer} = authSlice;
export default reducer;