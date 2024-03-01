import { combineReducers, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
   
});

// InitialState
const initialState = {};

export const store = configureStore({
   reducer: rootReducer,
   preloadedState: initialState,
});