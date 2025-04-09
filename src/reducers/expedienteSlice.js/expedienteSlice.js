import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: undefined,
    clave: undefined,
    idUsuarioCreador: undefined,
    idTipoMacroproceso: undefined,
    idMacroproceso: undefined,
    idProceso: undefined,
    idSerie: undefined,
    idSubserie: undefined,
    fechaCreacion: undefined,
    fechaApertura: undefined,
    resumenContenido: undefined,
    idAreaProcedenciaN: undefined,
    folioSIO: undefined,
    idAreaSIO: undefined,
    reclamante: undefined,
    idInstitucion: undefined,
    idEstatus: undefined,
    instanciaProceso: undefined,
    institucion_financiera: undefined
};

const expedienteInfoSlice = createSlice({
    name: "expedienteInfo",
    initialState,
    reducers: {
        setExpedienteInfo: (state, action) => {
            state.id = action.payload.id
            state.clave = action.payload.clave
            state.idUsuarioCreador = action.payload.idUsuarioCreador
            state.idTipoMacroproceso = action.payload.idTipoMacroproceso
            state.idMacroproceso = action.payload.idMacroproceso
            state.idProceso = action.payload.idProceso
            state.idSerie = action.payload.idSerie
            state.idSubserie = action.payload.idSubserie
            state.fechaCreacion = action.payload.fechaCreacion
            state.fechaApertura = action.payload.fechaApertura
            state.resumenContenido = action.payload.resumenContenido
            state.idAreaProcedenciaN = action.payload.idAreaProcedenciaN
            state.folioSIO = action.payload.folioSIO
            state.idAreaSIO = action.payload.idAreaSIO
            state.reclamante = action.payload.reclamante
            state.idInstitucion = action.payload.idInstitucion
            state.idEstatus = action.payload.idEstatus
            state.instanciaProceso = action.payload.instanciaProceso
            state.institucion_financiera = action.payload.institucion_financiera
        },
    },
});

// Action creators are generated for each case reducer function
export const { setExpedienteInfo } = expedienteInfoSlice.actions

export default expedienteInfoSlice.reducer //LO EXPORTARLO PARA LLEVARLO AL "STORE(store.js)"