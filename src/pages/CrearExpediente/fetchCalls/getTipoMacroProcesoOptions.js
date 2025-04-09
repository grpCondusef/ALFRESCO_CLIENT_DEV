import { URL_API } from "../../../utils/constants"


export const getTipoMacroProcesoOptions = async (token, areaId, setTipoMacroprocesoOptions) => {
    try {
        const url = `${URL_API}/catalogos/tipomacroproceso-options-view/?area_id=${areaId}`
        const respuesta = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        const resultado = await respuesta.json()
        setTipoMacroprocesoOptions(resultado.tipo_macroproceso)
    } catch (error) {
        console.log(error)
    }
}