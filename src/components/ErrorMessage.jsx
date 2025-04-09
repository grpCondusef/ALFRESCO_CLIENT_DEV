import React from 'react'
import '../CSS/MessageError.css'

const ErrorMessage = ({ children }) => {
    return (
        <div
            data-testid='error-message'
            className='message-error-container'
        >
            {children}
        </div>
    )
}

export default ErrorMessage
