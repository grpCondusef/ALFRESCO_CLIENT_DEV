import { URL_API } from "../../../utils/constants"
import { addRegistroBitacora } from "../../CrearExpediente/fetchCalls/addRegistroBitacora"

export const generarIntegradoFoliado = async (token, cca, clave, expediente_id, selectedCheckboxes, loaderDispatch, setLoader, setPdfUrl, modalDispatch, setModal, setErrorGenerarIntegrado, errorMessagePortada) => {

    const selectedDocumentsData = Object.keys(selectedCheckboxes).map(Number)

    console.log(selectedDocumentsData)

    loaderDispatch(setLoader({
        showLoader: true
    }))
    try {
        const url = `${URL_API}/digitalizacion/generar-integrado-con-archivos-seleccionados/` //SELECCIONAMOS CLIENTE POR SU "id"
        const respuesta = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                "clave": clave,
                "expediente": expediente_id,
                'documents': selectedDocumentsData
            }),
            headers: {
                "Content-type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        }) //NO PONEMOS EL MÉTODO PORQUE "fetch" POR DEFECTO YA TRAE EL MÉTODO "GET"
        const resultado = await respuesta.json() //CREAMOS UN "JSON" QUE CONTENGA LOS DATOS DEL CLIENTE SELECCIONADO

        loaderDispatch(setLoader({
            showLoader: false
        }))

        setPdfUrl(`${URL_API}/files/` + resultado.documento)
        modalDispatch(setModal({
            showModalPDF: true,
        }))

        addRegistroBitacora(token, 'crear', `generar integrado del expediente ${clave}`, expediente_id)

    } catch (error) {
        setErrorGenerarIntegrado(true)
        errorMessagePortada()
    }
}