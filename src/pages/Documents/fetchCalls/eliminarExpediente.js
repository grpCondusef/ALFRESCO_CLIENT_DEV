import { URL_API } from "../../../utils/constants"
import { addRegistroBitacora } from "../../CrearExpediente/fetchCalls/addRegistroBitacora"


export const eliminarExpediente = async (token, expediente_id, clave, navigate) => {
    const confirmar = confirm('Realmente desea eliminar este expediente?')

    if (confirmar) {
        try {
            const url = `${URL_API}/catalogos/expediente-system-remove/${expediente_id}` //SELECCIONAMOS CLIENTE POR SU "id"
            const respuesta = await fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            }) //NO PONEMOS EL MÉTODO PORQUE "fetch" POR DEFECTO YA TRAE EL MÉTODO "GET"
            //const resultado = await respuesta.json() //CREAMOS UN "JSON" QUE CONTENGA LOS DATOS DEL CLIENTE SELECCIONADO 
            addRegistroBitacora(token, 'eliminar', `eliminar expediente ${clave}`, expediente_id)
            navigate('/expedientes-list')
        } catch (error) {
            console.log(error)
        }
    }
}