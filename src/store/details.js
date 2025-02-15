import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    info: null,
}
const details = createSlice({
    name: 'details',
    initialState,
    reducers: {
        addMovieDets: (state, action) => {
            state.info = action.payload
        },
        removeMovieDets: (state, action) => {
            state.info = null
        },
        addTvDets: (state, action) => {
            state.info = action.payload
        },
        removeTvDets: (state, action) => {
            state.info = null
        },
        addPersonDets: (state, action) => {
            state.info = action.payload
        },
        removePersonDets: (state, action) => {
            state.info = null
        }
    }
})

export default details.reducer
export const { addMovieDets, addPersonDets, addTvDets, removeMovieDets, removePersonDets, removeTvDets } = details.actions