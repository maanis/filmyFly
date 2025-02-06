import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: 'movies',
    initialState: {
        nowPlaying: null,
        queryResults: null
    },
    reducers: {
        addMovies: (state, action) => {
            state.nowPlaying = action.payload
        },
        addQueryDets: (state, action) => {
            state.queryResults = action.payload
        }
    }
})

export default movieSlice.reducer
export const { addMovies, addQueryDets } = movieSlice.actions