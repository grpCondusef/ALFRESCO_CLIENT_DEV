import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment' //PARA FORMATEAR LAS FECHAS
import content_icon from '../../img/icons/content-icon.png'
import '../../CSS/Expedientes.css'
import SearchBox from '../../components/SearchBox'
import { setExpedientesList } from '../../reducers/expedientesListSlice/expedientesListSlice'
import { CONDUSEF_TOKEN } from '../../utils/constants'
import { Loader } from '../../components/Loader'
import { Modal } from '../../components/Modal'
import ErrorMessage from '../../components/ErrorMessage'
import { Pagination } from '../../components/Pagination'

export const Expedientes = () => {

    const token = localStorage.getItem(CONDUSEF_TOKEN)
    const { expedientes } = useSelector(state => state.expedientes) //CONSUMIMOS EL STATE A TRAVÉS DE REDUX
    const { showLoader } = useSelector(state => state.loader) //CONSUMIMOS EL STATE A TRAVÉS DE REDUX
    const { showModalMessage } = useSelector(state => state.modal) //CONSUMIMOS EL STATE A TRAVÉS DE REDUX
    const { showErrorMessage, errorMessage } = useSelector(state => state.errorMessage)
    const { paginas, pagina, paginaActual, paginaAnterior, totalPaginas, total_expedientes } = useSelector(state => state.pagination) //CONSUMIMOS EL STATE A TRAVÉS DE REDUX
    const { search, searchPagination, search_total_expedientes } = useSelector(state => state.search) //CONSUMIMOS EL STATE A TRAVÉS DE REDUX
    const [expedientesArray, setExpedientesArray] = useState([])
    const size = 10

    //useEffect(() => {
    //    getExpedientes(token, size, paginaAnterior, loaderDispatch, setLoader, expedientesDispatch, setExpedientesList, paginationDispatch, setPagination)
    //}, [])

    useEffect(() => {
        expedientes.expedientes ? setExpedientesArray(expedientes.expedientes) : ''
    }, [expedientes])

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
                <p>Resultados: {search_total_expedientes ? search_total_expedientes : total_expedientes} resultados</p>
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
                        {expedientesArray ? (
                            expedientesArray.map((item, index) => {
                                const { id, estatus, idTipoMacroproceso, clave, folioSIO, pori, reclamante, institucion_financiera, fechaApertura, fechaCreacion } = item
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
                                            {idTipoMacroproceso}
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
                                            {fechaCreacion != null ? moment(fechaCreacion).format('YYYY-MM-DD') : ''}
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

                {totalPaginas > 1 ? (
                    <Pagination
                        size={size}
                    />
                ) : ''}
            </div>
        </div>
    )
}
