import { URL_API } from "../../../utils/constants"


export const getInstitucionesFinancieras = async (token, setData) => {
    try {
        const url = `${URL_API}/catalogos/if-lista-view/`
        const respuesta = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        const resultado = await respuesta.json()
        const { instituciones_financieras } = resultado
        setData(instituciones_financieras)
    } catch (error) {
        console.log(error)
    }
}