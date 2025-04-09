import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    expedientes: [],
};

const expedientesListSlice = createSlice({
    name: "expedientes",
    initialState,
    reducers: {
        setExpedientesList: (state, action) => {
            state.expedientes = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setExpedientesList } = expedientesListSlice.actions

export default expedientesListSlice.reducer //LO EXPORTARLO PARA LLEVARLO AL "STORE(store.js)"