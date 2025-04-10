import { URL_API } from "../../../utils/constants"

export const goToLastPage = async (token, size, loaderDispatch, setLoader, expedientesDispatch, setExpedientesList, paginationDispatch, setPagination, pagina, paginas, paginaAnterior, totalPaginas) => {
    loaderDispatch(setLoader({
        showLoader: true
    }))
    try {
        const url = `${URL_API}/catalogos/expedientes-lista-view?size=${size}&page=${totalPaginas}`
        const respuesta = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        })
        const resultado = await respuesta.json()
        expedientesDispatch(setExpedientesList({ //MODIFICAMOS EL STATE PARA ACTUALIZAR LOS REGISTROS QUE SE MUESTRAN CON BASE EN LA BÚSQUEDA
            expedientes: resultado.expedientes
        }))
        paginationDispatch(setPagination({
            paginas: resultado.paginas,
            pagina: totalPaginas,
            paginaAnterior,
            totalPaginas
        }))
        loaderDispatch(setLoader({
            showLoader: false
        }))
    } catch (error) {
        console.log(error)
    }
    paginationDispatch(setPagination({
        paginas,
        pagina: totalPaginas,
        paginaAnterior: pagina - 1,
        totalPaginas
    }))
}