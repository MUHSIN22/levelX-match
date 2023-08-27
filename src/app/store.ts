import { configureStore } from "@reduxjs/toolkit"

// Importing all reducers
import rootReducer from "../features/root/rootSlice";

const store = configureStore({
    reducer:{
        root: rootReducer
    }
})

// Type of state and dispatch for creating custom hook for dispatch and select
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
