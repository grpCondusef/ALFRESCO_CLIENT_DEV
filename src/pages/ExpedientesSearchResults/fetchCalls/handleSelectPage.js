import { URL_API } from "../../../utils/constants"


export const handleSelectPage = async (token, size, item, loaderDispatch, setLoader, expedientesDispatch, setExpedientesList, paginationDispatch, setPagination, pagina, paginas, paginaAnterior, totalPaginas) => {
    loaderDispatch(setLoader({
        showLoader: true
    }))
    try {
        const url = `${URL_API}/catalogos/expedientes-lista-view?size=${size}&page=${item}`
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
            pagina: item,
            paginaAnterior,
            totalPaginas,
            total_expedientes: resultado.total_expedientes
        }))
        loaderDispatch(setLoader({
            showLoader: false
        }))
    } catch (error) {
        console.log(error)
    }
    if (item > 1) {
        paginationDispatch(setPagination({
            paginas,
            pagina: item,
            paginaAnterior: pagina - 1,
            totalPaginas
        }))
    } else {
        paginationDispatch(setPagination({
            paginas,
            pagina: item,
            paginaAnterior: null,
            totalPaginas
        }))
    }
}