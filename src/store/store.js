import { configureStore } from "@reduxjs/toolkit";
import userSlice from './userSlice'
import movieSlice from './movieSlice'
import utils from './utils'


const store = configureStore({
    reducer: {
        user: userSlice,
        movies: movieSlice,
        utils: utils
    }
})

export default store