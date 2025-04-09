import { URL_API } from "../../../utils/constants"


export const getProcesoOptions = async (token, areaId, tipoMacroproceso, macroproceso, setProcesos) => {
    try {
        const url = `${URL_API}/catalogos/proceso-options-view/?tipomacroproceso_id=${tipoMacroproceso}&macroproceso_id=${macroproceso}&area_id=${areaId}`
        const respuesta = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        const resultado = await respuesta.json()
        const { procesos } = resultado
        setProcesos(procesos)
    } catch (error) {
        console.log(error)
    }
}