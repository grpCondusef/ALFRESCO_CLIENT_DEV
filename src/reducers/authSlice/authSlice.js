import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: undefined,
    username: undefined,
    first_name: undefined,
    last_name: undefined,
    area_id: undefined,
    area: undefined,
    idAreaSIO: undefined,
    tipo_cuenta: undefined,
    crear_expedientes: undefined,
    eliminar_expedientes: undefined,
    subir_documentos: undefined,
    consulta_completa: undefined,
    carga_masiva: undefined,
    areas_asociadas: [],
    eliminar_documentos: undefined,
    dashboard_uau: undefined,
    certificar_expediente:undefined
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.token = action.payload.token
            state.username = action.payload.username
            state.first_name = action.payload.first_name
            state.last_name = action.payload.last_name
            state.area_id = action.payload.area_id
            state.area = action.payload.area
            state.idAreaSIO = action.payload.idAreaSIO
            state.tipo_cuenta = action.payload.tipo_cuenta
            state.crear_expedientes = action.payload.crear_expedientes
            state.eliminar_expedientes = action.payload.eliminar_expedientes
            state.subir_documentos = action.payload.subir_documentos
            state.consulta_completa = action.payload.consulta_completa
            state.carga_masiva = action.payload.carga_masiva
            state.areas_asociadas = action.payload.areas_asociadas
            state.eliminar_documentos = action.payload.eliminar_documentos
            state.dashboard_uau = action.payload.dashboard_uau
            state.certificar_expediente = action.payload.certificar_expediente // Agregamos la propiedad recursos_revision
            // Puedes agregar más propiedades según sea necesario
        },
    },
});

// Action creators are generated for each case reducer function
export const { setAuth } = authSlice.actions

export default authSlice.reducer //LO EXPORTARLO PARA LLEVARLO AL "STORE(store.js)"