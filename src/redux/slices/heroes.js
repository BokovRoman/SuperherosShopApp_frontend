import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchHeroes = createAsyncThunk('heroes/fetchHeroes', async () => {
    const { data } = await axios.get('/heroes');
    return data;
})

export const fetchRemoveHeroes = createAsyncThunk('heroes/fetchRemoveHeroes', async (id) => {
    const { data } = await axios.delete(`/heroes/${id}`);
    return data;
})

const initialState = {
    heroes: {
        items: [],
        status: 'loading',
    },
};

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchHeroes.pending]: (state) => {
            state.heroes.items = [];
            state.heroes.status = 'loading';
        },
        [fetchHeroes.fulfilled]: (state, action) => {
            state.heroes.items = action.payload;
            state.heroes.status = 'loaded';
        },
        [fetchHeroes.rejected]: (state) => {
            state.heroes.items = [];
            state.heroes.status = 'error';
        },
         [fetchRemoveHeroes.pending]: (state, action) => {
            state.heroes.items = state.heroes.items.filter((obj)=>obj._id!==action.meta.arg);
            state.heroes.status = 'loading';
        },
    },
});

export const heroesReducer = heroesSlice.reducer;