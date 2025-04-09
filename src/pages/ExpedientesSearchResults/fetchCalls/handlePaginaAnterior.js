import { URL_API } from "../../../utils/constants"


export const handlePaginaAnterior = async (token, size, pagina, loaderDispatch, setLoader, expedientesDispatch, setExpedientesList, paginationDispatch, setPagination, paginaAnterior, totalPaginas) => {
    if (pagina > 1) {
        loaderDispatch(setLoader({
            showLoader: true
        }))
        try {
            const url = `${URL_API}/catalogos/expedientes-lista-view?size=${size}&page=${pagina - 1}`
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
                pagina: pagina - 1,
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
    }
}