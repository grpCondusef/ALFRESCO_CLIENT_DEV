import { URL_API } from "../../../utils/constants"

export const addRegistroBitacora = async (token, action, description, expediente) => {
    const data = {
        "action": action,
        "description": description,
        "expediente": expediente
    }
    try {
        const url = `${URL_API}/users/add-registro-bitacora/`
        const respuesta = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        const resultado = await respuesta.json()

    } catch (error) {
        console.log(error)
    }
}