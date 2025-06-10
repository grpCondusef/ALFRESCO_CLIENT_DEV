
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showModalMessage: false,
    showModalPDF: false,
    showModalUploadPDF: false,
    showModalLeyenda: false, // NUEVO
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setModal: (state, action) => {
            state.showModalMessage = action.payload.showModalMessage
            state.showModalPDF = action.payload.showModalPDF
            state.showModalUploadPDF = action.payload.showModalUploadPDF
            state.showModalLeyenda = action.payload.showModalLeyenda // NUEVO
        },
    },
});

// Action creators are generated for each case reducer function
export const { setModal } = modalSlice.actions

export default modalSlice.reducer //LO EXPORTARLO PARA LLEVARLO AL "STORE(store.js)"