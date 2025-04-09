import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { CSVLink, CSVDownload } from "react-csv"

export const GraphTable = ({ dataTable, downloadData, tableHeight }) => {

    //optionally access the underlying virtualizer instance
    const rowVirtualizerInstanceRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [sorting, setSorting] = useState([]);
    const data = dataTable || []; // Utiliza la prop tableData o un array vacío si no se proporciona
    const download = downloadData || false; // Utiliza la prop tableData o un array vacío si no se proporciona


    const tableColumns = useMemo(
        () => [
            {
                accessorKey: 'area', //normal accessorKey
                header: 'UAU',
                size: 200,
            },
            {
                accessorKey: 'clave',
                header: 'Clave',
                size: 150,
            },
            {
                accessorKey: 'folio',
                header: 'Folio',
                size: 150,
            },
            {
                accessorKey: 'reclamante',
                header: 'Reclamante',
                size: 150,
            },
            {
                accessorKey: 'institucion',
                header: 'Institución',
                size: 150,
            },
            {
                accessorKey: 'estatus',
                header: 'Estatus',
                size: 150,
            },
            {
                accessorKey: 'total_documents',
                header: 'Documents',
                size: 150,
            },
        ],
        [],
    );


    return (
        <div className="EstatusDigGraphTable-container">
            {download ?
                <CSVLink
                    data={data}
                    filename={"estatus-expedientes.xls"}
                    className="btn-download-data"
                    target="_blank"
                >
                    <svg
                        className="w-6 h-6 export-expediente-status-data"
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
                    Descargar
                </CSVLink>
                : ''}
            <MaterialReactTable
                columns={tableColumns}
                data={data} //10,000 rows
                enableBottomToolbar={false}
                enableColumnResizing
                enableColumnVirtualization
                enableGlobalFilterModes
                enablePagination={false}
                enablePinning
                enableRowNumbers
                enableRowVirtualization
                muiTableContainerProps={{ sx: { maxHeight: `${tableHeight}` } }}
                onSortingChange={setSorting}
                state={{ isLoading, sorting }}
                rowVirtualizerInstanceRef={rowVirtualizerInstanceRef} //optional
                rowVirtualizerProps={{ overscan: 5 }} //optionally customize the row virtualizer
                columnVirtualizerProps={{ overscan: 2 }} //optionally customize the column virtualizer
            />
        </div>
    )
}

