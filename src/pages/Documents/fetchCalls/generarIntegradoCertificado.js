import { URL_API } from "../../../utils/constants"
import { addRegistroBitacora } from "../../CrearExpediente/fetchCalls/addRegistroBitacora"

export const generarIntegradoCertificado = async (
    token,
    clave,
    expediente_id,
    loaderDispatch,
    setLoader,
    setPdfUrl,
    modalDispatch,
    setModal,
    setErrorGenerarCertificado,
    errorMessagePortada,
    setLeyendaPrevia,    // función para guardar la leyenda previa
    recurrente           // valor ingresado por el usuario, opcional
) => {
    loaderDispatch(setLoader({ showLoader: true }))
    try {
        const bodyData = {
            "clave": clave,
            "expediente": expediente_id,
        }
        if (recurrente) bodyData["recurrente"] = recurrente

        const url = `${URL_API}/digitalizacion/generar-integrado-certificado/`
        const respuesta = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(bodyData),
            headers: {
                "Content-type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        })
        const resultado = await respuesta.json()

        loaderDispatch(setLoader({ showLoader: false }))

        // Si el backend pide confirmación del recurrente (leyenda_previa)
        if (resultado.leyenda_previa) {
            setLeyendaPrevia(resultado.leyenda_previa)
            modalDispatch(setModal({
                showModalMessage: false,
                showModalPDF: false,
                showModalUploadPDF: false,
                showModalLeyenda: true    // Abre el modal de confirmación de leyenda
            }))
            return
        }

        // Si devuelve el PDF final
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
        setErrorGenerarCertificado(true)
        errorMessagePortada()
    }
}