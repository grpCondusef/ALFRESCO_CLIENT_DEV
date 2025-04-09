import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    paginas: [],
    pagina: 1,
    paginaActual: null,
    paginaSiguiente: null,
    paginaAnterior: null,
    totalPaginas: 0,
    total_expedientes: 0,
};

const paginationSlice = createSlice({
    name: "pagination",
    initialState,
    reducers: {
        setPagination: (state, action) => {
            state.paginas = action.payload.paginas
            state.pagina = action.payload.pagina
            state.paginaActual = action.payload.paginaActual
            state.paginaSiguiente = action.payload.paginaSiguiente
            state.paginaAnterior = action.payload.paginaAnterior
            state.totalPaginas = action.payload.totalPaginas
            state.total_expedientes = action.payload.total_expedientes
        },
    },
});

// Action creators are generated for each case reducer function
export const { setPagination } = paginationSlice.actions

export default paginationSlice.reducer //LO EXPORTARLO PARA LLEVARLO AL "STORE(store.js)"