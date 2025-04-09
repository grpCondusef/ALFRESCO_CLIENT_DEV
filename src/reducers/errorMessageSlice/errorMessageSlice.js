
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showErrorMessage: false,
    errorMessage: '',
};

const errorMessageSlice = createSlice({
    name: "errorMessage",
    initialState,
    reducers: {
        setErrorMessage: (state, action) => {
            state.showErrorMessage = action.payload.showErrorMessage
            state.errorMessage = action.payload.errorMessage
        },
    },
});

// Action creators are generated for each case reducer function
export const { setErrorMessage } = errorMessageSlice.actions

export default errorMessageSlice.reducer //LO EXPORTARLO PARA LLEVARLO AL "STORE(store.js)"