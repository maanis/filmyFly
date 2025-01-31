import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: 'movies',
    initialState: {
        nowPlaying: null
    },
    reducers: {
        addMovies: (state, action) => {
            state.nowPlaying = action.payload
        }
    }
})

export const { addMovies } = movieSlice.actions
export default movieSlice.reducer