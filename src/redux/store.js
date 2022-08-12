import { configureStore } from "@reduxjs/toolkit";
import { heroesReducer } from './slices/heroes';
import {authReducer } from './slices/auth';

const store = configureStore({
    reducer: {
        heroes: heroesReducer,
        auth:authReducer,
    },

});

export default store;