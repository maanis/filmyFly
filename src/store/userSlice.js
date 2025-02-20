import { createSlice } from "@reduxjs/toolkit";

// Load user data from localStorage if available
const initialState = JSON.parse(localStorage.getItem("user")) || null;

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            localStorage.setItem("user", JSON.stringify(action.payload)); // Save to localStorage
            return action.payload;
        },
        removeUser: () => {
            localStorage.removeItem("user"); // Remove from localStorage
            return null;
        }
    }
});

export default userSlice.reducer;
export const { addUser, removeUser } = userSlice.actions;
