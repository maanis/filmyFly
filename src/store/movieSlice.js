import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: 'movies',
    initialState: {
        feedItems: null,
        trending: null,
        queryResults: null
    },
    reducers: {
        addTrending: (state, action) => {
            state.trending = action.payload
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
export const { addTrending, addFeedItems, addQueryDets } = movieSlice.actions