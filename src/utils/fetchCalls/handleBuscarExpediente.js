import { setModal } from "../../reducers/modalSlice/modalSlice"
import { URL_API } from "../constants"


export const handleBuscarExpediente = async (token, size, values, loaderDispatch, setLoader, expedientesDispatch, setExpedientesList, searchDispatch, setSearch, paginationDispatch, setPagination, paginaActual, paginaSiguiente, paginaAnterior, modalDispatch, errorMessageDispatch, setErrorMessage) => {
    loaderDispatch(setLoader({
        showLoader: true
    }))
    try {
        const url = `${URL_API}/catalogos/expedientes-search/?size=${size}&page=${1}`
        const params = {
            method: 'POST',
            body: JSON.stringify({
                'search': values.search
            }),
            headers: {
                "Content-type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        }
        const respuesta = await fetch(url, params) //NO PONEMOS EL MÉTODO PORQUE "fetch" POR DEFECTO YA TRAE EL MÉTODO "GET"
        const resultado = await respuesta.json() //CREAMOS UN "JSON" 
        //console.log(resultado.expedientes.length)
        if (respuesta.status === 200) {

            expedientesDispatch(setExpedientesList({ //MODIFICAMOS EL STATE PARA ACTUALIZAR LOS REGISTROS QUE SE MUESTRAN CON BASE EN LA BÚSQUEDA
                expedientes: resultado.expedientes
            }))
            loaderDispatch(setLoader({
                showLoader: false
            }))
            searchDispatch(setSearch({
                search: values.search,
                searchPagination: true,
                search_total_expedientes: resultado.total_expedientes
            }))
            paginationDispatch(setPagination({
                paginas: resultado.paginas,
                pagina: 1,
                paginaActual: 1,
                paginaAnterior,
                totalPaginas: resultado.total_de_paginas,
            }))
        } else {
            loaderDispatch(setLoader({
                showLoader: false
            }))
            modalDispatch(setModal({ //MOSTRAMOS EL MENSAJE DE SUCCESS
                showModalMessage: true
            }))
            errorMessageDispatch(setErrorMessage({
                showErrorMessage: true,
                errorMessage: resultado.msg
            }))
        }

    } catch (error) {
        loaderDispatch(setLoader({
            showLoader: false
        }))
        modalDispatch(setModal({ //MOSTRAMOS EL MENSAJE DE SUCCESS
            showModalMessage: true
        }))
        errorMessageDispatch(setErrorMessage({
            showErrorMessage: true,
            errorMessage: 'No hay resultados para esta búsqueda'
        }))
    }
}