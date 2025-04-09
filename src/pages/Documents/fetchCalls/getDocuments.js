import { URL_API } from "../../../utils/constants"


export const getDocuments = async (token, expediente_id, loaderDispatch, setLoader, setDocuments, setCCA) => {
    loaderDispatch(setLoader({
        showLoader: true
    }))
    try {
        const url = `${URL_API}/digitalizacion/documents-lista-view/?expediente_id=${expediente_id}` //SELECCIONAMOS CLIENTE POR SU "id"
        const respuesta = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        }) //NO PONEMOS EL MÉTODO PORQUE "fetch" POR DEFECTO YA TRAE EL MÉTODO "GET"
        const resultado = await respuesta.json() //CREAMOS UN "JSON" QUE CONTENGA LOS DATOS DEL CLIENTE SELECCIONADO

        const { documents, CCA } = resultado

        setDocuments(documents)
        setCCA(CCA)

    } catch (error) {
        console.log(error)
    }
    loaderDispatch(setLoader({
        showLoader: false
    }))
}