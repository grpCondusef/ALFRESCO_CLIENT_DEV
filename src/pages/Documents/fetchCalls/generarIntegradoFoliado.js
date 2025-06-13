import { URL_API } from "../../../utils/constants"
import { addRegistroBitacora } from "../../CrearExpediente/fetchCalls/addRegistroBitacora"

export const generarIntegradoFoliado = async (
    token,
    cca,
    clave,
    expediente_id,
    selectedCheckboxes,
    loaderDispatch,
    setLoader,
    setPdfUrl,
    modalDispatch,
    setModal,
    setErrorGenerarIntegrado,
    errorMessagePortada,
    setLeyendaPrevia,    // <- NUEVO: función para guardar la leyenda previa en el state
    recurrente           // <- NUEVO: el valor del recurrente, opcional
) => {

    const selectedDocumentsData = Object.keys(selectedCheckboxes).map(Number)

    loaderDispatch(setLoader({
        showLoader: true
    }))

    try {
        const bodyData = {
            "clave": clave,
            "expediente": expediente_id,
            "documents": selectedDocumentsData
        }
        if (recurrente) bodyData["recurrente"] = recurrente

        const url = `${URL_API}/digitalizacion/generar-integrado-con-archivos-seleccionados/`
        const respuesta = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(bodyData),
            headers: {
                "Content-type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        })
        const resultado = await respuesta.json()

        loaderDispatch(setLoader({
            showLoader: false
        }))

        // PASO 1: Si el backend responde con leyenda_previa, abre modal de confirmación
        if (resultado.leyenda_previa) {
            setLeyendaPrevia(resultado.leyenda_previa)
            modalDispatch(setModal({
                showModalMessage: false,
                showModalPDF: false,
                showModalUploadPDF: false,
                showModalLeyenda: true    // <-- nuevo estado para abrir el modal de leyenda
            }))
            return
        }

        // PASO 2: Si responde con documento, muestra el PDF final
        if (resultado.documento) {
            setPdfUrl(`${URL_API}/files/` + resultado.documento)
            modalDispatch(setModal({
                showModalPDF: true,
                showModalMessage: false,
                showModalUploadPDF: false,
                showModalLeyenda: false
            }))
            addRegistroBitacora(token, 'crear', `generar certificado del expediente ${clave}`, expediente_id)
        }

    } catch (error) {
        setErrorGenerarIntegrado(true)
        errorMessagePortada()
    }
}