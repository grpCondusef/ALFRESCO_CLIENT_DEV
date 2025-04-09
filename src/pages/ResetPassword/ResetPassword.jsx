import React, { useEffect, useState } from 'react'
import ResetPasswordForm from './components/ResetPasswordForm'
import pageExpired from '../../img/ilustrations/page-expired.png'
import './css/ResetPassword.css'
import { useParams } from 'react-router-dom';

const ResetPassword = () => {

  const { moment } = useParams();
  const [momentToken, setMomentToken] = useState(true)

  const decryptMoment = (encryptedText, shift) => {
    let decryptedText = '';

    for (let i = 0; i < encryptedText.length; i++) {
      let charCode = encryptedText.charCodeAt(i);

      if (charCode >= 48 && charCode <= 57) { // Dígitos (0-9)
        decryptedText += String.fromCharCode((charCode - 48 - shift + 10) % 10 + 48);
      } else {
        decryptedText += encryptedText[i];
      }
    }

    return decryptedText;
  };

  const getMoment = () => {
    // Obtén la fecha y hora actual
    const fechaActual = new Date();

    // Extrae el año, mes, día, horas, minutos y segundos
    const year = fechaActual.getFullYear();  // Utiliza getFullYear en lugar de getYear
    const mes = fechaActual.getMonth() + 1; // Los meses comienzan desde 0, así que suma 1
    const dia = fechaActual.getDate();
    const horas = fechaActual.getHours();

    // Formatea el resultado
    const moment = `${year}${mes < 10 ? '0' : ''}${mes}${dia < 10 ? '0' : ''}${dia}${horas < 10 ? '0' : ''}${horas}`;

    return moment;
  };

  const compareTokenMoment = () => {
    const tokenMoment = decryptMoment(moment, 3);
    const currentMoment = getMoment();

    if (tokenMoment !== currentMoment) {
      setMomentToken(false)
    }
  };

  useEffect(() => {
    compareTokenMoment()
  }, [])

  return (
    <div className='reset-password-container'>
      {momentToken ? (
        <ResetPasswordForm />
      ) : (

        <div className='page-is-expired-container'>
          <img src={pageExpired} alt="page-expired" />
          <h2>La página ha caducado</h2>
        </div>
      )}
    </div>
  )
}

export default ResetPassword
