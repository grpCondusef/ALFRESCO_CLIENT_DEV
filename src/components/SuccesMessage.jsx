import React from 'react'
import { useDispatch } from 'react-redux'
import { setModal } from '../reducers/modalSlice/modalSlice'
import check_mark_icon from '../img/icons/check-mark.png'
import '../CSS/SuccessMessage.css'

export const SuccesMessage = ({children}) => {

    const modalDispatch = useDispatch()

    const handleCloseModal = () => {
        modalDispatch(setModal({
            showModalSuccess: false,
            showModalPDF: false,
            showModalUploadPDF: false
        }))
    }

    return (
        <div className="succes-message-container">
            <div className="check-green-container">
                <div>
                    <div className="checkmark-circle">
                        <div className="background"></div>
                        <div className="checkmark draw"></div>
                    </div>
                </div>
            </div>
            <div className="success-message-container">
                <h1>
                   {children}
                </h1>
            </div>
        </div>
    )
}
