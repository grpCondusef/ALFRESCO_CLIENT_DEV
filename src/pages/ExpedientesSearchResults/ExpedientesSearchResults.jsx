import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment' //PARA FORMATEAR LAS FECHAS
import content_icon from '../../img/icons/content-icon.png'
import '../../CSS/Expedientes.css'
import SearchBox from '../../components/SearchBox'
import { setExpedientesList } from '../../reducers/expedientesListSlice/expedientesListSlice'
import { CONDUSEF_TOKEN } from '../../utils/constants'
import { Loader } from '../../components/Loader'
import { setPagination } from '../../reducers/paginationSlice/paginationSlice'
import { setLoader } from '../../reducers/loaderSlice/loaderSlice'
import { getExpedientes } from '../../utils/fetchCalls/getExpedientes'
import { handleSelectPage } from './fetchCalls/handleSelectPage'
import { handlePaginaAnterior } from './fetchCalls/handlePaginaAnterior'
import { handleSiguientePagina } from './fetchCalls/handleSiguientePagina'
import { goToFirstPage } from './fetchCalls/goToFirstPage'
import { goToLastPage } from './fetchCalls/goToLastPage'
import { Modal } from '../../components/Modal'
import ErrorMessage from '../../components/ErrorMessage'

export const ExpedientesSearchResults = () => {

    const token = localStorage.getItem(CONDUSEF_TOKEN)
    const { search, page } = useParams() 
    const location = useLocation() //"useLocation()" ES UN "Hook" QUE ME PERMITE SABES LA "url" DEL SITIO EN LA QUE ESTOY ACTUALMENTE
    const [expedientes, setExpedientes] = useState([])
    const [pages, setPages] = useState([])
    const [lastPage, setLastPage] = useState(1)


    const { showLoader } = useSelector(state => state.loader) //CONSUMIMOS EL STATE A TRAVÉS DE REDUX
    const { showModalMessage } = useSelector(state => state.modal) //CONSUMIMOS EL STATE A TRAVÉS DE REDUX
    const { showErrorMessage, errorMessage } = useSelector(state => state.errorMessage)
    const { paginas, pagina, paginaAnterior, totalPaginas, total_expedientes } = useSelector(state => state.pagination) //CONSUMIMOS EL STATE A TRAVÉS DE REDUX
    const loaderDispatch = useDispatch()
    const expedientesDispatch = useDispatch()
    const paginationDispatch = useDispatch()
    const [expedientesArray, setExpedientesArray] = useState([])
    const size = 50

    //useEffect(() => {
    //    getExpedientes(token, size, paginaAnterior, loaderDispatch, setLoader, expedientesDispatch, setExpedientesList, paginationDispatch, setPagination)
    //}, [])
    const searchExpedientes = async () => {
        try {
            const url = `http://127.0.0.1:8000/catalogos/expedientes-search/?search=${search}&size=50&page=1` //SELECCIONAMOS CLIENTE POR SU "id"
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()

            const { expedientes, pages, last_page } = resultado

            setExpedientes(expedientes)
            setPages(pages)
            setLastPage(last_page)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        searchExpedientes()
    }, [location, page]);


    return (
        <div>
            {showErrorMessage && showModalMessage ? (
                <Modal>
                    <ErrorMessage>
                        {errorMessage}
                    </ErrorMessage>
                </Modal>
            ) : ''}
            {showLoader ? <Loader /> : ''}
            <div className='searchbox-container'>
                <SearchBox />
            </div>
            <div className="expedientes-buttons-container">
                <Link
                    className="btn-documents-regresar"
                    to={'/menu'}
                >
                    Regresar
                </Link>
            </div>
            <div className='total-resultados-container'>
                {/* <p>Mostrando {search_total_expedientes ? search_total_expedientes : total_expedientes} resultados</p> */}
            </div>
            <div className='expedientes-table-container'>
                <table className='table-expedientes'>
                    <thead className="expedientes-thead">
                        <tr>
                            <th className="column-field-head-expedientes">
                                Clave
                            </th>
                            <th className="column-field-head-expedientes">
                                Estado
                            </th>
                            <th className="column-field-head-expedientes">
                                Tipo Macroproceso
                            </th>
                            <th className="column-field-head-expedientes">
                                Folio SIO/Expediente
                            </th>
                            <th className="column-field-head-expedientes">
                                Folio Pori
                            </th>
                            <th className="column-field-head-expedientes">
                                Reclamante
                            </th>
                            <th className="column-field-head-expedientes">
                                Institución
                            </th>
                            <th className="column-field-head-expedientes">
                                Fecha de Apertura
                            </th>
                            <th className="column-field-head-expedientes">
                                Fecha de Creación
                            </th>
                            <th>

                            </th>
                        </tr>
                    </thead>
                    <tbody className='expedientes-tbody'>
                        {expedientes ? (
                            expedientes.map((item, index) => {
                                const { id, estatus, tipoMacroproceso, clave, folioSIO, pori, reclamante, institucion_financiera, fechaApertura, fechaCreacion } = item
                                return (
                                    <tr
                                        key={index}
                                        className='expedientes-row'
                                    >
                                        <td className="field-expedientes">
                                            {clave}
                                        </td>
                                        <td className="field-expedientes">
                                            {estatus}
                                        </td>
                                        <td className="field-expedientes">
                                            {tipoMacroproceso}
                                        </td>
                                        <td className="field-expedientes">
                                            {folioSIO}
                                        </td>
                                        <td className="field-expedientes">
                                            {pori}
                                        </td>
                                        <td className="field-expedientes">
                                            {reclamante}
                                        </td>
                                        <td className="field-expedientes">
                                            {institucion_financiera}
                                        </td>
                                        <td className="field-expedientes">
                                            {moment(fechaApertura).format('YYYY-MM-DD')}
                                        </td>
                                        <td className="field-expedientes">
                                            {moment(fechaCreacion).format('YYYY-MM-DD hh:mm')}
                                        </td>
                                        <td className="field-expedientes">
                                            <Link
                                                className='go-to-documents-btn'
                                                to={`/expediente/documents/${id}`}
                                                target="_blank"
                                            >
                                                <img className='content-icon' src={content_icon} alt="" />
                                                Ir a contenido
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })
                        ) : <tr></tr>}
                    </tbody>
                </table>

            </div>
        </div>
    )
}
