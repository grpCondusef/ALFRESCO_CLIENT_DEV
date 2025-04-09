import React from 'react'
import { useDispatch } from 'react-redux'
import '../CSS/Modal.css'
import close_icon from '../img/icons/close-icon.png'
import { setModal } from '../reducers/modalSlice/modalSlice'

export const Modal = ({ children }) => {

    const modalDispatch = useDispatch()

    const handleCloseModal = () => {
        modalDispatch(setModal({
            showModalMessage: false,
            showModalPDF: false,
            showModalUploadPDF: false,
        }))
    }

    return (
        <div className='modal-container'>
            <div className='contenido-modal'>
                <div className='close-icon-container'>
                    <button
                        className='close-modal-btn'
                        onClick={handleCloseModal}
                    >
                        <img src={close_icon} alt="" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}
