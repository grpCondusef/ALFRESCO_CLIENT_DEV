import '../css/SendEmailForm.css';
import passwordImg from '../../../img/ilustrations/password-img.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Loader } from '../../../components/Loader';
import ToasNotification from '../../../components/ToastNotification/ToasNotification';

const SendEmailForm = () => {
    const [username, setUsername] = useState('');
    const [showLoader, setshowLoader] = useState(false)
    const [showMessage, setshowMessage] = useState(false)
    const [message, setMessage] = useState('')
    const [typeMessage, setTypeMessage] = useState('')

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const sendRestoreEmail = async (e) => {
        e.preventDefault(); // Evita que se recargue la página al enviar el formulario

        setshowLoader(true)
        try {
            const userData = {
                username: username,
            };

            const url = 'http://10.33.1.238:8081/mailing/send-reset-password-email';
            const respuesta = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(userData),
                headers: {
                    'Content-type': 'application/json',
                },
            });

            const resultado = await respuesta.json();
            setUsername('');
            setshowLoader(false)
            setshowMessage(true);

            if (respuesta.status === 200) {
                const { msg } = resultado
                setMessage(msg)
                setTypeMessage('succes');
            } else {
                setTypeMessage('error');
            }

            console.log(resultado);
        } catch (error) {
            console.log(error);
            setUsername('')
            setshowLoader(false)
            setshowMessage(true);
            setTypeMessage('error');
            setMessage('Parece que hubo un error');
        }
    };

    return (
        <>
            {showLoader ? (
                <Loader />) : ''}
            {showMessage ? (<ToasNotification
                message={message}
                typeMessage={typeMessage}
                setShowMessage={setshowMessage}
            />) : ''}
            <form className='send-email-to-change-password-form' onSubmit={sendRestoreEmail}>
                <img src={passwordImg} alt="" />
                <h2>Restablecer mi contraseña</h2>
                <p>Ingresa tu usuario para restablecer tu contraseña</p>
                <input
                    onChange={handleUsernameChange}
                    type="text"
                    placeholder='Ingresa tu usuario'
                    value={username}
                    required
                />
                <Link to='/login'>Regresar al Inicio de Sesión</Link>
                <button
                    data-testid='btn-send-email'
                    type="submit"
                    className='send-email-to-restore-password-btn'
                >
                    Enviar Email
                </button>
            </form>
        </>
    );
}

export default SendEmailForm;
