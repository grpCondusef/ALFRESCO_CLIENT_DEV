import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import add_expediente_icon from '../../img/icons/add-expediente-btn-icon.png'
import search_expediente_icon from '../../img/icons/search-expediente-btn-icon.png'
import go_to_dashboard from '../../img/icons/go-to-dashboard-btn-icon.png'
import recursos_revision_icon from '../../img/icons/recursos-revision-btn-icon.png' // Asegúrate de tener este ícono
import './CSS/Menu.css'

export const Menu = () => {

    const navigate = useNavigate()
    const { crear_expedientes, dashboard_uau, certificar_expediente } = useSelector(state => state.auth) 

    const goToExpedientesModule = (link) => {
        navigate(`${link}`)
    }

    return (
        <div className='menu-container'>
            <div className='menu-options-container'>
                {crear_expedientes ? (
                    <button
                        className='expedientes-principal-menu-btn'
                        onClick={() => goToExpedientesModule('/agregar-expediente')}
                    >
                        <img src={add_expediente_icon} alt="" />
                        <span>CREAR EXPEDIENTE</span>
                    </button>
                ) : ''}
                <button
                    className='expedientes-principal-menu-btn'
                    onClick={() => goToExpedientesModule('/expedientes-list')}
                >
                    <img src={search_expediente_icon} alt="" />
                    <span>BUSCAR EXPEDIENTE</span>
                </button>
                {dashboard_uau ? (
                    <button
                        className='expedientes-principal-menu-btn'
                        onClick={() => goToExpedientesModule('/expediente/dashboard/')}
                    >
                        <img src={go_to_dashboard} alt="" />
                        <span>DASHBOARD</span>
                    </button>
                ) : ''}
                {certificar_expediente ? ( // Verificamos si el usuario tiene permiso para ver esta opción
                    <button
                        className='expedientes-principal-menu-btn'
                        onClick={() => goToExpedientesModule('/recursos-revision')}
                    >
                        <img src={recursos_revision_icon} alt="" />
                        <span>RECURSOS DE REVISIÓN</span>
                    </button>
                ) : ''}
            </div>
        </div>
    )
}
