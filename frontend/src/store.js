import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {thunk} from "redux-thunk";
import { productReducer } from "./reducers/productReducer";

const reducer =combineReducers({
    products:productReducer
});


// Initial state
let initialState = {
    products:[]
};

// Middleware array
const middleware = [thunk];

// Configure store
const store = configureStore({
    reducer,
    initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware)
});

export default store;
