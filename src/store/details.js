import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    movieDets: null,
    tvDets: null,
    personDets: null
}
const details = createSlice({
    name: 'details',
    initialState,
    reducers: {
        addMovieDets: (state, action) => {
            state.movieDets = action.payload
        },
        removeMovieDets: (state, action) => {
            state.movieDets = null
        },
        addTvDets: (state, action) => {
            state.tvDets = action.payload
        },
        removeTvDets: (state, action) => {
            state.tvDets = null
        },
        addPersonDets: (state, action) => {
            state.personDets = action.payload
        },
        removePersonDets: (state, action) => {
            state.personDets = null
        }
    }
})

export default details.reducer
export const { addMovieDets, addPersonDets, addTvDets, removeMovieDets, removePersonDets, removeTvDets } = details.actions