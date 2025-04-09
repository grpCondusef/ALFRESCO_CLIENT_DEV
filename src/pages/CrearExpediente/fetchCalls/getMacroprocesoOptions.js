import { URL_API } from "../../../utils/constants"


export const getMacroProcesoOptions = async (token, areaId, tipoMacroproceso, setMacroprocesos) => {
    try {
        const url = `${URL_API}/catalogos/macroproceso-options-view/?tipomacroproceso_id=${tipoMacroproceso}&area_id=${areaId}`
        const respuesta = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        const resultado = await respuesta.json()
        setMacroprocesos(resultado.macroprocesos)
    } catch (error) {
        console.log(error)
    }
}