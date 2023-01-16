import { configureStore } from "@reduxjs/toolkit";
import authReducer from './Feature/Auth/auth-slice';
import messageReducer from './Feature/Auth/message-slice';
import carsReducer from './Feature/Cars/cars-slice';
import orderReducer from './Feature/Order/order-slice';


export default configureStore({
    reducer: {
        auth: authReducer,
        cars: carsReducer,
        order: orderReducer,
        message: messageReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['your/action/type'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['items.dates'],
      },
    }),
    devTools : false,
})


