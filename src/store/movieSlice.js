import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: 'movies',
    initialState: {
        feedItems: null,
        trending: null,
        queryResults: null,
        playList: []
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
        },
        addPlayList: (state, action) => {
            state.playList.push(action.payload)
        },
        removePlaylist: (state, action) => {
            state.playList.filter(e => e.id != action.payload)
            console.log(action.payload)
        }

    }
})

export default movieSlice.reducer
export const { addTrending, addFeedItems, addQueryDets, addPlayList, removePlaylist } = movieSlice.actions