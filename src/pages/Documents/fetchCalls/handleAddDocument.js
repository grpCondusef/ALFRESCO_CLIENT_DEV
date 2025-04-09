import { URL_API } from "../../../utils/constants";
import { addRegistroBitacora } from "../../CrearExpediente/fetchCalls/addRegistroBitacora";


const timeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const formData = new FormData();
export const handleAddDocument = async (token, loaderDispatch, setLoader, modalDispatch, setModal, id, clave, pdfFile, errorMessageDispatch, setErrorMessage) => {

    formData.append("title", `${clave}_${pdfFile.name}`);
    formData.append("uploadedFile", pdfFile);
    formData.append("expediente", id);

    if (pdfFile !== '') {

        const confirmar = confirm('Realmente desea agregar este documento?')

        if (confirmar) {

            loaderDispatch(setLoader({
                showLoader: true
            }))

            //console.log(...formData)

            try {
                const url = `${URL_API}/digitalizacion/add-document-view/` //SELECCIONAMOS CLIENTE POR SU "id"
                const respuesta = await fetch(url, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                //NO PONEMOS EL MÉTODO PORQUE "fetch" POR DEFECTO YA TRAE EL MÉTODO "GET"
                const resultado = await respuesta.json() //CREAMOS UN "JSON" QUE CONTENGA LOS DATOS DEL CLIENTE SELECCIONADO
                if (respuesta.status === 200) {
                    addRegistroBitacora(token, 'agregar', `agregar documento ${resultado.document} al expediente ${clave}`, id)
                    errorMessageDispatch(setErrorMessage({
                        showErrorMessage: false,
                    }))
                    loaderDispatch(setLoader({
                        showLoader: false
                    }))
                    modalDispatch(setModal({ //MOSTRAMOS EL MENSAJE DE SUCCESS
                        showModalMessage: true,
                        showModalPDF: false,
                        showModalUploadPDF: false
                    }))
                    await timeout(2000); //MOSTRAMOS EL MENSAJE 2 SEGUNDOS Y RECARGAMOS LA PÁGINA
                    window.location.reload(false) //RECARGAMOS EL COMPONENTE UNA VEZ QUE HAYAMOS ENVIADO LOS DATOS
                } else {
                    loaderDispatch(setLoader({
                        showLoader: false
                    }))
                    modalDispatch(setModal({ //MOSTRAMOS EL MENSAJE DE ERROR
                        showModalMessage: true,
                        showModalPDF: false,
                        showModalUploadPDF: false
                    }))
                    errorMessageDispatch(setErrorMessage({
                        showErrorMessage: true,
                        errorMessage: 'Lo siento! No he podido leer tus portadas, por favor contacta al equipo administrador'
                    }))
                }
            } catch (error) {
                loaderDispatch(setLoader({
                    showLoader: false
                }))
                modalDispatch(setModal({ //MOSTRAMOS EL MENSAJE DE ERROR
                    showModalMessage: true,
                    showModalPDF: false,
                    showModalUploadPDF: false
                }))
                errorMessageDispatch(setErrorMessage({
                    showErrorMessage: true,
                    errorMessage: 'Parece ser que ha habido un error, intente de nuevo!'
                }))
            }
        }//
    }
}