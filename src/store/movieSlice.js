import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: 'movies',
    initialState: {
        nowPlaying: null,
        trending: null,
        queryResults: null
    },
    reducers: {
        addNowPlayingMovies: (state, action) => {
            state.nowPlaying = action.payload
        },
        addTrendingMovies: (state, action) => {
            state.trending = action.payload
        },
        addQueryDets: (state, action) => {
            state.queryResults = action.payload
        }
    }
})

export default movieSlice.reducer
export const { addNowPlayingMovies, addTrendingMovies, addQueryDets } = movieSlice.actions