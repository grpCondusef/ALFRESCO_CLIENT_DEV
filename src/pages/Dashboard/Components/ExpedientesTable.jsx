import React from 'react'

export const ExpedientesTable = () => {
    return (
        <table className='expedientes-without-documents-list'>
            <tbody
                className='expedientes-without-documents-tbody'
            >
                {expedientesWithoutDocumentsData.map((item, index) => {
                    const { area_id, area, total } = item
                    return (
                        <tr
                            key={index}
                            className='expedientes-without-documents-tr'
                            onClick={() => goToEmptyExpedientes(area_id)}
                        >
                            <td
                                className='expedientes-without-documents-td areas'
                            >
                                {area}
                            </td>
                            <td
                                className='expedientes-without-documents-td total-expedientes'
                            >
                                {total}
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
