import { URL_API } from "../../../utils/constants"
import { addRegistroBitacora } from "./addRegistroBitacora"
import moment from 'moment' //PARA FORMATEAR LAS FECHAS

const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const handleCrearExpediente = async (token, values, tipoMacroproceso, macroproceso, proceso, serie, area_id, idAreaSIO, institucionSeleccionada, setcamposVacios,loaderDispatch, setLoader, modalDispatch, setModal,  navigate, errorMessageDispatch, setErrorMessage) => {

    const expedienteData = {
        "idTipoMacroproceso": parseInt(tipoMacroproceso),
        "idMacroproceso": parseInt(macroproceso),
        "idProceso": parseInt(proceso),
        "idSerie": parseInt(serie),
        "fechaCreacion": moment().format("YYYY-MM-DD"),
        "fechaApertura": values.fechaApertura,
        "resumenContenido": values.resumenContenido.toUpperCase(),
        "idAreaProcedenciaN": parseInt(area_id),
        "folioSIO": values.folioSIO,
        "pori": values.poriFolio,
        "idAreaSIO": parseInt(idAreaSIO),
        "reclamante": values.reclamante.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
        "idInstitucion": parseInt(institucionSeleccionada),
        "idEstatus": parseInt(3),
        "instanciaProceso": "",
        "formatoSoporte": values.formatoSoporte
    }

    const verifyData = () => {
        if ((parseInt(serie) === 30 && !expedienteData.idInstitucion) || (parseInt(serie) !== 30 && expedienteData.idInstitucion) ) {
            return true
        } else {
            return false
        }
    }

    const confirmar = confirm('Los datos del expediente son correctos?')

    const completeData = verifyData()

    if (confirmar && completeData) {

        loaderDispatch(setLoader({
            showLoader: true
        }))

        try {
            const url = `${URL_API}/catalogos/expediente-add-view/`
            const respuesta = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(expedienteData),
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            const resultado = await respuesta.json()
            if (resultado) {
                if (resultado.expediente_data) {
                    const { expediente_data } = resultado
                    const { id, clave } = expediente_data
                    addRegistroBitacora(token, 'crear', `Expediente ${clave} creado`, id)
                    navigate(`/expediente/documents/${id}`)
                } else {
                    const { msg } = resultado
                    modalDispatch(setModal({ //MOSTRAMOS EL MENSAJE DE SUCCESS
                        showModalMessage: true
                    }))
                    errorMessageDispatch(setErrorMessage({
                        showErrorMessage: true,
                        errorMessage: msg
                    }))
                }
            }
        } catch (error) {
            errorMessageDispatch(setErrorMessage({
                showErrorMessage: true,
                errorMessage: 'Parece ser que ha habido un error! Intenta de nuevo'
            }))
        }
    } else {
        setcamposVacios(true)
        await timeout(3500)
        setcamposVacios(false)
    }
}