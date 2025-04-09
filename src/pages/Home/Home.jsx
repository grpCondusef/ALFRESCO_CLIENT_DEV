import React from 'react'
import digitalizar_icon from '../../img/icons/Digitalizacion-Expedientes_02.svg'
import go_to_expedientes_digitalization from '../../img/icons/expedientes_digitalization_btn_icon.png'
import './CSS/Home.css'
import { Link, useNavigate } from 'react-router-dom'

export const Home = () => {

    const navigate = useNavigate() 

    const goToExpedientesDigitlization = (link) => {
        navigate(`${link}`)
    }
 
    return (
        <div className='home-container'>
            <div className='menu-container'>
                <div className='menu-options-container'>
                    <button
                        className='expedientes-principal-menu-btn'
                        onClick={() => goToExpedientesDigitlization('/menu')}
                    >
                        <img src={go_to_expedientes_digitalization} alt="" />
                        <span>DIGITALIZACIÓN DE EXPEDIENTES</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
