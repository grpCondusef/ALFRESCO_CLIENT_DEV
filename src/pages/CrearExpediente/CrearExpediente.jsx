import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Modal } from '../../components/Modal'
import ErrorMessage from '../../components/ErrorMessage'
import CrearExpedienteForm from './Components/CrearExpedienteForm'
import './CSS/CrearExpediente.css'
import { Loader } from '../../components/Loader'

const CrearExpediente = () => {

  const [migrarExpediente, setMigrarExpediente] = useState(false)
  const { carga_masiva } = useSelector(state => state.auth)
  const { showErrorMessage, errorMessage } = useSelector(state => state.errorMessage)
  const { showModalMessage } = useSelector(state => state.modal) //CONSUMIMOS EL STATE A TRAVÉS DE REDUX
  const { showLoader } = useSelector(state => state.loader) //CONSUMIMOS EL STATE A TRAVÉS DE REDUX

  const showMigrationForm = () => {
    setMigrarExpediente(!migrarExpediente)
  }

  return (
    <div className='crear-expediente-container'>
      {showLoader ? <Loader /> : ''}
      <div className='go-to-add-migrate-expediente-container'>
        {carga_masiva ? (
          <Link
            to={'/carga-masiva/'}
            className='option-create-expediente-btn'>
            Carga Masiva
            <svg className="w-6 h-6 massive-upload-icon-btn" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>

          </Link>
        ) : ''}
      </div>
      <div className='add-expediente-form-header'>
        {migrarExpediente ?
          (<p className='add-expediente-title-header'>Migrar Expediente 2022</p>)
          :
          (<p className='add-expediente-title-header'>Crear Expediente</p>)}
      </div>
      {showErrorMessage && showModalMessage ? (
        <Modal>
          <ErrorMessage>
            {errorMessage}
          </ErrorMessage>
        </Modal>
      ) : ''}
      <CrearExpedienteForm />
    </div>
  )
}

export default CrearExpediente
