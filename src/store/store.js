import { configureStore } from "@reduxjs/toolkit";
import userSlice from './userSlice'
import movieSlice from './movieSlice'
import utils from './utils'
import details from './details'


const store = configureStore({
    reducer: {
        user: userSlice,
        movies: movieSlice,
        utils: utils,
        details: details,
    }
})

export default store