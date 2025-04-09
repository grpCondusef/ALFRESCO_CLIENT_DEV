import { URL_API } from "../constants"


export const getTiposDocumentales = async (token, setTiposDocumentales) => {
    try {
        const url = `${URL_API}/catalogos/tipo-documental-lista-view/`
        const respuesta = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        const resultado = await respuesta.json()
        setTiposDocumentales(resultado)
    } catch (error) {
        console.log(error)
    }
}