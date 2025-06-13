import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from "formik"; //LO USAMOS PARA CREAR FORMULARIOS
import { CONDUSEF_TOKEN, URL_API } from '../../../utils/constants'
import condusef_logo from '../../../img/icons/condusef-logo-completo.png'
import '../CSS/LoginForm.css'
import { setAuth } from '../../../reducers/authSlice/authSlice';
import { setLoader } from '../../../reducers/loaderSlice/loaderSlice';
import ErrorMessage from '../../../components/ErrorMessage';


export const LoginForm = () => {

  const authDispatch = useDispatch()
  const loaderDispatch = useDispatch()
  const navigate = useNavigate()
  const [showMessageError, setShowMessageError] = useState(false)

  const handleLogin = async (values) => {
    if (values.username === '' || values.password === '') {
      setShowMessageError(true)
      MessageError()
    }
    loaderDispatch(setLoader({
      showLoader: true
    }))
    try {
      const url = `${URL_API}/users/login/` //SELECCIONAMOS CLIENTE POR SU "id"
      const respuesta = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          "Content-type": "application/json"
        }
      })
      const resultado = await respuesta.json() //TRAEMOS EL RESULTADO
      authDispatch(setAuth({
        username: resultado.username,
        first_name: resultado.first_name,
        last_name: resultado.last_name,
        area_id: resultado.area_id,
        area: resultado.area,
        idAreaSIO: resultado.idAreaSIO,
        tipo_cuenta: resultado.tipo_cuenta,
        crear_expedientes: resultado.crear_expedientes,
        eliminar_expedientes: resultado.eliminar_expedientes,
        subir_documentos: resultado.subir_documentos,
        consulta_completa: resultado.consulta_completa,
        migrar_expediente: resultado.migrar_expediente,
        carga_masiva: resultado.carga_masiva,
        areas_asociadas: resultado.areas_asociadas,
        eliminar_documentos: resultado.eliminar_documentos,
        dashboard_uau: resultado.dashboard_uau,
        certficar_expediente: resultado.certificar_expediente // Agregamos la propiedad recursos_revision
      }))
      localStorage.setItem(CONDUSEF_TOKEN, resultado.token.access) //AGREGAMOS EL TOKEN AL LOCAL STORAGE
      navigate("/")

    } catch (error) {
    }
    loaderDispatch(setLoader({
      showLoader: false
    }))
  }

  const MessageError = () => {
    setTimeout(() => {
      setShowMessageError(false)
    }, 3600);
  }

  return (
    <div className='login-form-container'>
      <Formik
        initialValues={{
          //INICIALIZAMOS LOS VALORES DE LOS CAMPOS
          username: "",
          password: "",
        }}

        onSubmit={(values) => {
          handleLogin(values)
        }}
      >
        <Form className='login-form'>
          <img
            data-testid='login-form-logo'
            className='login-form-logo'
            src={condusef_logo}
            alt="condusef-logo"
          />
          {showMessageError ? (
            <ErrorMessage >
              Parece que ha habido un error, intenta de nuevo!
            </ErrorMessage>
          ) : ''}
          <div className='login-form-header-container'>
            <h2>Iniciar Sesión</h2>
            <p>
              Te damos la bienvenida!! Por favor agrega tus credenciales para iniciar
            </p>
          </div>
          <div >
          </div>
          <Field
            data-testid='username-input'
            name="username"
            id="username"
            type="text"
            className="login-field"
            placeholder="Ingresa tu usuario"
            required
          />
          <Field
            data-testid='password-input'
            name="password"
            id="password"
            type="password"
            autoComplete="on"
            className="login-field"
            placeholder="Ingresa tu contraseña"
            required
          />

          <div className='restore-password-link-container'>
            <Link className='restore-password-link' to={'/send-email-to-restore-password/'}>
              Restablecer mi contraseña
            </Link>
          </div>

          <button
            data-testid='btn-login'
            type="submit"
            className='login-button'
          >
            Iniciar Sesión
          </button>
        </Form>
      </Formik>
    </div>
  )
}
