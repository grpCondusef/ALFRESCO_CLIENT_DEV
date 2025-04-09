import React from 'react'
import { useDispatch } from 'react-redux'
import '../../../CSS/Modal.css'
import close_icon from '../../../img/icons/close-icon.png'
import { setModal } from '../../../reducers/modalSlice/modalSlice'

export const MessageModal = ({ children }) => {

    const modalDispatch = useDispatch()

    const handleCloseModal = () => {
        modalDispatch(setModal({ 
            showModalPDF: false,
            showModalUploadPDF: false
        }))
    }

    return (
        <div className='modal-container'>
            <div className='contenido-modal'>
                <div className='close-icon-container'>
                </div>
                {children}
            </div>
        </div>
    )
}
