import React from 'react';
import './css/ToasNotification.css';
import { useEffect } from 'react';

const ToasNotification = ({ message, typeMessage, setShowMessage }) => {

    const successMsg = (
        <div className="toast succes">
            <svg className="w-6 h-6 toast-circle-icon circle-check" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            {message}
        </div>
    );

    const errorMsg = (
        <div className="toast error">
            <svg className="w-6 h-6 toast-circle-icon circle-exclamation" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
            {message}
        </div>
    );

    useEffect(() => {
        const toast = document.getElementById('toastBox');

        const removeToast = () => {
            if (toast) {
                toast.remove();
                setShowMessage(false)
            }
        };

        setTimeout(removeToast, 5000);


        // Clean up function to clear the timeout when the component is unmounted
        return () => clearTimeout(removeToast);
    }, []);


    return (
        <div>
            <div id="toastBox">
                {typeMessage === 'succes' ? successMsg : errorMsg}
            </div>
        </div>
    );
};

export default ToasNotification;
