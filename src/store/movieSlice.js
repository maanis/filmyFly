import { createSlice } from "@reduxjs/toolkit";

// Load stored playlist from localStorage on app start
const loadPlaylist = () => {
    const storedPlaylist = localStorage.getItem("playlist");
    return storedPlaylist ? JSON.parse(storedPlaylist) : [];
};

const movieSlice = createSlice({
    name: "movies",
    initialState: {
        feedItems: null,
        trending: null,
        queryResults: null,
        playlist: loadPlaylist(), // Load playlist from localStorage
    },
    reducers: {
        addTrending: (state, action) => {
            state.trending = action.payload;
        },
        addFeedItems: (state, action) => {
            state.feedItems = action.payload;
        },
        addQueryDets: (state, action) => {
            state.queryResults = action.payload;
        },
        toggle: (state, action) => {
            console.log(action.payload)
            const id = state.playlist.findIndex((e) => e.Dets.id === action.payload.Dets.id);
            if (id !== -1) {
                state.playlist.splice(id, 1); // Remove item if it exists
            } else {
                state.playlist.push(action.payload); // Add item if not in playlist
            }

            // Save updated playlist to localStorage
            localStorage.setItem("playlist", JSON.stringify(state.playlist));
        },
    },
});

export default movieSlice.reducer;
export const { addTrending, addFeedItems, addQueryDets, toggle } = movieSlice.actions;
