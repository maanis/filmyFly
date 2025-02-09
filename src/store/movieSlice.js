import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: 'movies',
    initialState: {
        nowPlaying: null,
        feedItems: null,
        queryResults: null
    },
    reducers: {
        addNowPlayingMovies: (state, action) => {
            state.nowPlaying = action.payload
        },
        addFeedItems: (state, action) => {
            state.feedItems = action.payload
        },
        addQueryDets: (state, action) => {
            state.queryResults = action.payload
        }
    }
})

export default movieSlice.reducer
export const { addNowPlayingMovies, addFeedItems, addQueryDets } = movieSlice.actions