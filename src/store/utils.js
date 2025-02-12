import { createSlice } from "@reduxjs/toolkit";

const utils = createSlice({
    name: 'utils',
    initialState: false,
    reducers: {
        toggleSidebar: (state, action) => {
            return action.payload
        }
    }
})

export default utils.reducer
export const { toggleSidebar } = utils.actions