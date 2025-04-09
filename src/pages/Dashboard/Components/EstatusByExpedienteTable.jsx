import React, { useRef, useState, useEffect } from 'react';
import { useDownloadExcel } from 'react-export-table-to-excel';
import '../CSS/EstatusByExpedientesTable.css'

export const EstatusByExpedienteTable = ({ estatusByExpedientes, lazyElements }) => {
  const tableRef = useRef(null);
  const [visibleRows, setVisibleRows] = useState(1000); // Número de filas visibles inicialmente

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'Expedientes_estatus_data',
    sheet: 'Expedientes'
  });

  useEffect(() => {
    // Actualizar el número de filas visibles cuando el tamaño de la tabla cambie
    const handleResize = () => {
      const tableHeight = tableRef.current.offsetHeight;
      const rowHeight = 48; // Altura estimada de una fila (ajusta esto según tus estilos)
      const newVisibleRows = Math.ceil(tableHeight / rowHeight);
      setVisibleRows(newVisibleRows);
    };

    handleResize(); // Inicialmente, establecer el número de filas visibles
    window.addEventListener('resize', handleResize); // Actualizar el número de filas visibles al cambiar el tamaño de la ventana

    return () => {
      window.removeEventListener('resize', handleResize); // Limpiar el event listener al desmontar el componente
    };
  }, []);

  return (
    <div className="table-estatus-by-expedientes-container">

      <div className='export-table-status-expedientes-btn-container'>
        <button className="export-table-status-expedientes-btn" onClick={onDownload}>
          Exportar tabla
          <svg
            className="w-6 h-6 export-table-status-expedientes-btn-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <table className="table-expedientes-status" ref={tableRef}>
        <thead className="estatus-by-expedientes-thead">
          <tr>
            <th className="column-field-head-expedientes">UAU</th>
            <th className="column-field-head-expedientes">Clave</th>
            <th className="column-field-head-expedientes">Folio</th>
            <th className="column-field-head-expedientes">Estatus</th>
            <th className="column-field-head-expedientes">Documentos cargados</th>
          </tr>
        </thead>
        <tbody className="expedientes-tbody">
          {estatusByExpedientes &&
            estatusByExpedientes.slice(0, lazyElements).map((item, index) => {
              const { clave, folio, area, Estatus, total_documents } = item;
              return (
                <tr key={index} className="expedientes-row">
                  <td className="field-expedientes">{area}</td>
                  <td className="field-expedientes">{clave}</td>
                  <td className="field-expedientes">{folio}</td>
                  <td className="field-expedientes">{Estatus}</td>
                  <td className="field-expedientes">{total_documents}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};