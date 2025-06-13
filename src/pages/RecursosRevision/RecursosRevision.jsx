import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRecursosRevision } from '../../reducers/recursosRevisionSlice/recursosRevisionSlice';
import { getRecursosRevision } from './fetchCalls/getRecursosRevision';
import moment from 'moment';

export const RecursosRevision = ({ isAdmin = false }) => {
    const token = localStorage.getItem("CONDUSEF_TOKEN");
    const dispatch = useDispatch();
    const { recursos } = useSelector(state => state.recursosRevision);

    useEffect(() => {
        getRecursosRevision(token, isAdmin, dispatch, setRecursosRevision);
    }, [token, isAdmin, dispatch]);

    return (
        <div>
            <div className="documents-title-container">
                <h2>Recursos de Revisión</h2>
            </div>
            <div className="expedientes-table-container">
                <table className="table-expedientes">
                    <thead className="expedientes-thead">
                        <tr>
                            <th>Unidad que envía</th>
                            <th>Fecha de recepción del recurso de revisión</th>
                            <th>No. de expediente</th>
                            <th>Recurrente</th>
                            <th>Archivo PDF digitalizado del recurso de revisión</th>
                            <th>Expediente digitalizado certificado</th>
                            <th>Fecha de envío a la DGSL</th>
                        </tr>
                    </thead>
                    <tbody className='expedientes-tbody'>
                        {recursos && recursos.length > 0 ? recursos.map((item, idx) => (
                            <tr key={item.id || idx}>
                                <td>{item.area_nombre || item.area?.nombre || ''}</td>
                                <td>{item.fecha_recepcion_recurso ? moment(item.fecha_recepcion_recurso).format('DD/MM/YYYY') : ''}</td>
                                <td>{item.folio_expediente}</td>
                                <td>{item.recurrente}</td>
                                <td>
                                    {item.pdf_recurso_revision 
                                        ? <a href={item.pdf_recurso_revision} target="_blank" rel="noopener noreferrer">
                                            <img src="/img/icons/pdf-icon.png" alt="PDF" />
                                          </a>
                                        : "-"}
                                </td>
                                <td>
                                    {item.pdf_certificado 
                                        ? <a href={item.pdf_certificado} target="_blank" rel="noopener noreferrer">
                                            <img src="/img/icons/pdf-icon.png" alt="PDF" />
                                          </a>
                                        : "-"}
                                </td>
                                <td>{item.fecha_envio_dgsl ? moment(item.fecha_envio_dgsl).format('DD/MM/YYYY') : ''}</td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={7}>No hay recursos disponibles.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}