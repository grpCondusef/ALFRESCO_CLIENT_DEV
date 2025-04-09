import { URL_API } from "../../../utils/constants"

export const getExpedienteInfo = async (token, expediente_id, expedienteInfoDispatch, setExpedienteInfo) => {
    try {
        const url = `${URL_API}/catalogos/expediente-info/${expediente_id}` //SELECCIONAMOS expediente POR SU "id"
        const respuesta = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        }) //NO PONEMOS EL MÉTODO PORQUE "fetch" POR DEFECTO YA TRAE EL MÉTODO "GET"
        const resultado = await respuesta.json() //CREAMOS UN "JSON" QUE CONTENGA LOS DATOS DEL CLIENTE SELECCIONADO

        expedienteInfoDispatch(setExpedienteInfo({
            id: resultado.id,
            clave: resultado.clave,
            idUsuarioCreador: resultado.idUsuarioCreador,
            idTipoMacroproceso: resultado.idTipoMacroproceso,
            idMacroproceso: resultado.idMacroproceso,
            idProceso: resultado.idProceso,
            idSerie: resultado.idSerie,
            idSubserie: resultado.idSubserie,
            fechaCreacion: resultado.fechaCreacion,
            fechaApertura: resultado.fechaApertura,
            resumenContenido: resultado.resumenContenido,
            idAreaProcedenciaN: resultado.idAreaProcedenciaN,
            folioSIO: resultado.folioSIO,
            idAreaSIO: resultado.idAreaSIO,
            reclamante: resultado.reclamante,
            idInstitucion: resultado.idInstitucion,
            idEstatus: resultado.idEstatus,
            instanciaProceso: resultado.instanciaProceso,
            institucion_financiera: resultado.institucion_financiera
        }))

    } catch (error) {
        console.log(error)
    }
}