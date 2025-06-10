import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setModal } from '../../../reducers/modalSlice/modalSlice'

/**
 * Props:
 * - leyendaPrevia: string
 * - onConfirm: function(recurrente)
 */
export const CertificacionLeyendaModal = ({ leyendaPrevia, onConfirm }) => {
    const [recurrente, setRecurrente] = useState('')
    const modalDispatch = useDispatch()

    const handleClose = () => {
        modalDispatch(setModal({
            showModalMessage: false,
            showModalPDF: false,
            showModalUploadPDF: false,
            showModalLeyenda: false
        }))
    }

    const handleConfirm = () => {
        if (!recurrente.trim()) {
            alert('Por favor ingresa el nombre del recurrente.')
            return
        }
        onConfirm(recurrente)
        handleClose()
    }

    // Resalta el texto editable
    const leyendaEditable = leyendaPrevia.replace('[Escriba aquí el nombre del recurrente]', `<span style="color:red; font-weight:bold;">${recurrente || '[Escriba aquí el nombre del recurrente]'}</span>`)

    return (
        <div className="modal-container">
            <div className="contenido-modal">
                <h2>Certificación electrónica</h2>
                <div style={{ margin: "1rem 0", maxHeight: 300, overflow: 'auto' }}>
                    <div dangerouslySetInnerHTML={{ __html: leyendaEditable }} />
                </div>
                <div>
                    <label>
                        Nombre o denominación del/la recurrente:
                        <input
                            type="text"
                            value={recurrente}
                            onChange={e => setRecurrente(e.target.value)}
                            style={{ width: "100%", marginTop: "0.3rem" }}
                        />
                    </label>
                </div>
                <div style={{ marginTop: "1.3rem", display: "flex", gap: "1rem" }}>
                    <button onClick={handleConfirm}>Confirmar y generar certificado</button>
                    <button onClick={handleClose}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}