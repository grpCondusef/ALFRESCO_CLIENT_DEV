import React from 'react'
import condusef_logo from '../img/icons/condusef-logo-header.png'
import header_banner from '../img/icons/header_banner.png'
import '../CSS/Header.css'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CONDUSEF_TOKEN } from '../utils/constants'
import { useState } from 'react'

export const Header = () => {

    const { first_name, last_name, area } = useSelector(state => state.auth) //CONSUMIMOS EL STATE A TRAVÉS DE REDUX
    const [showMenu, setShowMenu] = useState(false)

    const navigate = useNavigate()

    const handleLogOut = () => {
        const confirmar = confirm('Desea cerrar su sesión?')
        if (confirmar) {
            localStorage.removeItem(CONDUSEF_TOKEN)
            window.location.reload(false)
        }
    }

    const goToChangePassword = () => {
        setShowMenu(false)
        navigate('/cambiar-password')
    }

    const firstNameFirstLetter = first_name ? first_name.charAt(0) : ''
    const lastNameFirstLetter = last_name ? last_name.charAt(0) : ''

    return (
        <header>
            <Link to={'/menu'} className="header-logo-container">
                <img className="logo-header" src={condusef_logo} alt="" />
            </Link>
            <div className="session-header">
                <div
                    className='header-username-container'
                    onClick={() => setShowMenu(!showMenu)}
                >
                    <div className='header-username'>
                        <p>{firstNameFirstLetter} {lastNameFirstLetter}</p>
                    </div>
                    <div className='header-complete-name-container'>
                        <p>{first_name} {last_name}</p>
                    </div>
                    <svg className="w-6 h-6 show-header-menu-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
                {/* <button
                        className="sessio-options-button"
                        onClick={() => {
                            handleLogOut()
                        }}
                    >
                        Cerrar Sesión
                    </button> */}
                <div className={showMenu ? 'header-session-menu-visible' : 'header-session-menu-hidden'}>
                    <button
                        className='header-session-menu-btn'
                        onClick={goToChangePassword}
                    >
                        Cambiar contraseña
                    </button>
                    <button
                        className='header-session-menu-btn'
                        onClick={handleLogOut}
                    >
                        Salir
                    </button>
                </div>
            </div>
        </header>
    )
}
