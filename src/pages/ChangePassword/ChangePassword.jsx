import React, { useState } from 'react';
import './CSS/ChangePasswordForm.css';
import ToasNotification from '../../components/ToastNotification/ToasNotification';
import { URL_API } from '../../utils/constants';
import { useSelector } from 'react-redux';

const ChangePassword = () => {

    const { username } = useSelector(state => state.auth) //CONSUMIMOS EL STATE A TRAVÉS DE REDUX

    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showMessage, setShowMessage] = useState(false)
    const [message, setMessage] = useState(null)
    const [typeMessage, setTypeMessage] = useState(null)

    const updatePassword = async (e) => {
        e.preventDefault();
        setShowMessage(false)

        const url = `${URL_API}/users/update-password-by-user/`

        const userData = {
            "username": username,
            "password": password,
            "new_password": newPassword,
            "confirm_password": confirmPassword
        }

        try {

            const respuesta = await fetch(url, {
                method: 'PUT',
                body: JSON.stringify(userData),
                headers: {
                    "Content-type": "application/json"
                }
            })

            const resultado = await respuesta.json()

            const { msg } = resultado

            if (respuesta.status === 200) {
                setMessage(msg)
                setTypeMessage('succes')

                // Limpiar los campos después de procesar la información si es necesario
                setPassword('');
                setNewPassword('');
                setConfirmPassword('');
            }


            if (respuesta.status === 400) {
                setMessage(resultado.error)
                setTypeMessage('error')
            }

        } catch (error) {
            console.log(error)
        }

        setShowMessage(true)
    };

    return (
        <div className='change-password-form-container'>

            {showMessage === true ?
                <ToasNotification
                    message={message}
                    typeMessage={typeMessage}
                    setShowMessage={setShowMessage}
                />
                : ''}
            <h2 className='change-password-title'>Cambiar contraseña</h2>
            <form
                onSubmit={e => updatePassword(e)}
                className="material-form"
            >
                <div className="material-form__container">
                    <input
                        className="material-form__input"
                        type="password"
                        placeholder=" "
                        id="input-password"
                        pattern="[a-zA-Z0-9._ -]{6,18}"
                        maxLength="18"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="material-form__label" htmlFor="input-password">Contraseña</label>
                    <div className="material-form__focus-animation"></div>
                    <p className="material-form__error">Contraseña no válida</p>
                </div>
                <div className="material-form__container">
                    <input
                        className="material-form__input"
                        type="password"
                        placeholder=" "
                        id="input-new-password"
                        pattern="[a-zA-Z0-9._ -]{6,18}"
                        maxLength="18"
                        autoComplete="current-password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <label className="material-form__label" htmlFor="input-new-password">Nueva Contraseña</label>
                    <div className="material-form__focus-animation"></div>
                    <p className="material-form__error">Contraseña no válida</p>
                </div>
                <div className="material-form__container">
                    <input
                        className="material-form__input"
                        type="password"
                        placeholder=" "
                        id="input-confirm-password"
                        pattern="[a-zA-Z0-9._ -]{6,18}"
                        maxLength="18"
                        autoComplete="current-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <label className="material-form__label" htmlFor="input-confirm-password">Confirmar Contraseña</label>
                    <div className="material-form__focus-animation"></div>
                    <p className="material-form__error">Contraseña no válida</p>
                </div>
                <button className="material-form__button">Cambiar Password</button>
            </form>
        </div>
    );
};

export default ChangePassword;
