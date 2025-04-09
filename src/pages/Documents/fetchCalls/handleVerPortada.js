import { URL_API } from "../../../utils/constants"
import { addRegistroBitacora } from "../../CrearExpediente/fetchCalls/addRegistroBitacora"


export const handleVerPortada = async (token, expediente_id, clave, loaderDispatch, setLoader, setPdfUrl, modalDispatch, setModal) => {
    loaderDispatch(setLoader({
        showLoader: true
    }))
    try {
        const url = `${URL_API}/digitalizacion/ver-portada/` //SELECCIONAMOS CLIENTE POR SU "id"
        const respuesta = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                "expediente_id": expediente_id
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
        setPdfUrl(`${URL_API}/files/` + resultado.pdf_url)
        console.log(`${URL_API}/files/` + resultado.pdf_url)
        modalDispatch(setModal({
            showModalPDF: true,
        }))

    } catch (error) {
        console.log(error)
    }
}