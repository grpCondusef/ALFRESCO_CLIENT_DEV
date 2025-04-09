import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    search: '',
    searchPagination: false,
    search_total_expedientes: 0
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload.search
            state.searchPagination = action.payload.searchPagination
            state.search_total_expedientes = action.payload.search_total_expedientes
        },
    },
});

// Action creators are generated for each case reducer function
export const { setSearch } = searchSlice.actions

export default searchSlice.reducer //LO EXPORTARLO PARA LLEVARLO AL "STORE(store.js)"