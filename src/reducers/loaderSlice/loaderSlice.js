
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showLoader: false,
};

const loaderSlice = createSlice({
    name: "loader",
    initialState,
    reducers: {
        setLoader: (state, action) => {
            state.showLoader = action.payload.showLoader
        },
    },
});

// Action creators are generated for each case reducer function
export const { setLoader } = loaderSlice.actions

export default loaderSlice.reducer //LO EXPORTARLO PARA LLEVARLO AL "STORE(store.js)"