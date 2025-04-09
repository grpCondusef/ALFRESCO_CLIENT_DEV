import { useNavigate, useParams } from 'react-router-dom';
import padlock from '../../../img/ilustrations/paddlock-password-img.png';
import '../css/ResetPasswordForm.css';
import { useState } from 'react';
import ToasNotification from '../../../components/ToastNotification/ToasNotification';
import { Loader } from '../../../components/Loader';
import { URL_API } from '../../../utils/constants';

const ResetPasswordForm = () => {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showLoader, setshowLoader] = useState(false)
    const [showMessage, setshowMessage] = useState(false)
    const [message, setMessage] = useState('')
    const [typeMessage, setTypeMessage] = useState('')
    const navigate = useNavigate()

    const resetPassword = async () => {
        setshowLoader(true);

        const delayedNavigate = () => {
            navigate('/login/');
        };

        if (password === confirmPassword) {
            try {
                const userData = {
                    token: token,
                    password: password,
                };

                const url = `${URL_API}/users/forgot-password-token/`;
                const respuesta = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(userData),
                    headers: {
                        'Content-type': 'application/json',
                    },
                });

                const resultado = await respuesta.json();
                console.log(resultado);
                setPassword('');
                setConfirmPassword('');
                setshowLoader(false);
                setshowMessage(true);

                if (respuesta.status === 200) {
                    const { msg } = resultado;
                    setMessage(msg);
                    setTypeMessage('succes');
                } else {
                    setTypeMessage('error');
                }

                // Retrasa el navigate en 4 segundos
                setTimeout(delayedNavigate, 4800);
                
            } catch (error) {
                console.log(error);
                setPassword('');
                setConfirmPassword('');
                setshowLoader(false);
                setshowMessage(true);
                setTypeMessage('error');
                setMessage('Parece que hubo un error');
            }
        } else {
            setPassword('');
            setConfirmPassword('');
            setshowLoader(false);
            setshowMessage(true);
            setTypeMessage('error');
            setMessage('Las contraseñas no coinciden');
        }

    };


    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        resetPassword();
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
                <form className='reset-password-form' onSubmit={handleSubmit}>
                    <img src={padlock} alt='padlock-img' />
                    <h2>Restablecer contraseña</h2>
                    <input
                        type='password'
                        placeholder='Ingresa tu nueva contraseña'
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    <input
                        type='password'
                        placeholder='Confirma tu nueva contraseña'
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        required
                    />
                    <button type='submit' className='reset-password-btn'>
                        Restablecer contraseña
                    </button>
                </form>
        </>
    );
};

export default ResetPasswordForm;
