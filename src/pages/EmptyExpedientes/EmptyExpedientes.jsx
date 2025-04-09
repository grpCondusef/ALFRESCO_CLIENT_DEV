import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import moment from 'moment' //PARA FORMATEAR LAS FECHAS
import { useDownloadExcel } from 'react-export-table-to-excel';
import { Header } from '../../components/Header'
import { CONDUSEF_TOKEN, URL_API } from '../../utils/constants'
import { Link, useParams } from 'react-router-dom'
import content_icon from '../../img/icons/content-icon.png'
import { useRef } from 'react';
import './CSS/EmptyExpedientes.css'

const EmptyExpedientes = () => {

    const token = localStorage.getItem(CONDUSEF_TOKEN)
    const { area_id } = useParams()
    const tableRef = useRef(null);
    const [expedientes, setExpedientes] = useState([])

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: 'Expedientes_vacios',
        sheet: 'Expedientes'
    })

    const getEmptyExpedientes = async () => {
        try {
            const url = `${URL_API}/dashboard/get-empty-expedientes-by-selected-area/?area_id=${area_id}`
            const respuesta = await fetch(url, {
                method: 'GET',
                headers: {
                    "Content-type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            })
            const resultado = await respuesta.json()
            const { expedientes } = resultado
            setExpedientes(expedientes)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getEmptyExpedientes()
    }, [])


    return (
        <div>
            <Header />
            <div className='expedientes-table-container'>
                <button
                    className='export-table-empty-expedientes-btn'
                    onClick={onDownload}
                >
                    Exportar tabla
                    <svg className="w-6 h-6 export-table-empty-expedientes-btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                    </svg>
                </button>

                <table
                    ref={tableRef}
                    className='table-expedientes'
                >
                    <thead className="expedientes-thead">
                        <tr>
                            <th className="column-field-head-expedientes">
                                #
                            </th>
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
                                const { id, idEstatus__nombre, idTipoMacroproceso__nombre, clave, folioSIO, pori, reclamante, idInstitucion__nombre_corto, fechaApertura, fechaCreacion } = item
                                return (
                                    <tr
                                        key={index}
                                        className='expedientes-row'
                                    >
                                        <td className="field-expedientes">
                                            {index + 1}
                                        </td>
                                        <td className="field-expedientes">
                                            {clave}
                                        </td>
                                        <td className="field-expedientes">
                                            {idEstatus__nombre}
                                        </td>
                                        <td className="field-expedientes">
                                            {idTipoMacroproceso__nombre}
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
                                            {idInstitucion__nombre_corto}
                                        </td>
                                        <td className="field-expedientes">
                                            {moment(fechaApertura).format('YYYY-MM-DD')}
                                        </td>
                                        <td className="field-expedientes">
                                            {moment(fechaCreacion).format('YYYY-MM-DD')}
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

export default EmptyExpedientes
