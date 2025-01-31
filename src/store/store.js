import { configureStore } from "@reduxjs/toolkit";
import userSlice from './userSlice'
import movieSlice from './moviesSlice'

const store = configureStore({
    reducer: {
        user: userSlice,
        movies: movieSlice
    }
})

export default store