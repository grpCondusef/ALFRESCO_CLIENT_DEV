import { URL_API } from "../../../utils/constants"

export const getSerieOptions = async (token, areaId, tipoMacroproceso, macroproceso, proceso, setSeries) => {
    try {
        const url = `${URL_API}/catalogos/serie-options-view/?tipomacroproceso_id=${tipoMacroproceso}&macroproceso_id=${macroproceso}&proceso_id=${proceso}&area_id=${areaId}`
        const respuesta = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        const resultado = await respuesta.json()
        setSeries(resultado.series)
    } catch (error) {
        console.log(error)
    }
}