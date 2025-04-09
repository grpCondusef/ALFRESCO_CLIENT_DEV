import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import '../CSS/Pagination.css'
import { setExpedientesList } from '../reducers/expedientesListSlice/expedientesListSlice'
import { setLoader } from '../reducers/loaderSlice/loaderSlice'
import { setModal } from '../reducers/modalSlice/modalSlice'
import { setPagination } from '../reducers/paginationSlice/paginationSlice'
import { setSearch } from '../reducers/searchSlice/searchSlice'
import { CONDUSEF_TOKEN, URL_API } from '../utils/constants'

export const Pagination = ({ size }) => {

    const token = localStorage.getItem(CONDUSEF_TOKEN)
    const loaderDispatch = useDispatch()
    const expedientesDispatch = useDispatch()
    const searchDispatch = useDispatch()
    const paginationDispatch = useDispatch()
    const { paginas, pagina, paginaActual, paginaSiguiente, paginaAnterior, totalPaginas, total_expedientes } = useSelector(state => state.pagination) //CONSUMIMOS EL STATE A TRAVÉS DE REDUX
    const { search, searchPagination, search_total_expedientes } = useSelector(state => state.search) //CONSUMIMOS EL STATE A TRAVÉS DE REDUX


    const handleGoToNextPage = async (paginaSiguiente) => {
        loaderDispatch(setLoader({
            showLoader: true
        }))
        try {
            const url = `${URL_API}/catalogos/expedientes-search/?size=${size}&page=${paginaSiguiente}`
            const params = {
                method: 'POST',
                body: JSON.stringify({
                    'search': search
                }),
                headers: {
                    "Content-type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            }
            const respuesta = await fetch(url, params) //NO PONEMOS EL MÉTODO PORQUE "fetch" POR DEFECTO YA TRAE EL MÉTODO "GET"
            const resultado = await respuesta.json() //CREAMOS UN "JSON" 
            //console.log(resultado.expedientes.length)
            if (resultado.expedientes) {

                expedientesDispatch(setExpedientesList({ //MODIFICAMOS EL STATE PARA ACTUALIZAR LOS REGISTROS QUE SE MUESTRAN CON BASE EN LA BÚSQUEDA
                    expedientes: resultado.expedientes
                }))
                loaderDispatch(setLoader({
                    showLoader: false
                }))
                searchDispatch(setSearch({
                    search: search,
                    searchPagination: searchPagination,
                    search_total_expedientes: resultado.total_expedientes
                }))
                paginationDispatch(setPagination({
                    paginas: resultado.paginas,
                    pagina: resultado.siguiente_pagina,
                    paginaSiguiente: resultado.siguiente_pagina,
                    paginaActual: resultado.pagina_actual,
                    paginaAnterior,
                    totalPaginas: resultado.total_de_paginas,
                }))
            } else {
                loaderDispatch(setLoader({
                    showLoader: false
                }))
                modalDispatch(setModal({ //MOSTRAMOS EL MENSAJE DE SUCCESS
                    showModalMessage: true
                }))
                errorMessageDispatch(setErrorMessage({
                    showErrorMessage: true,
                    errorMessage: resultado.message
                }))
            }

        } catch (error) {
            console.log(error)
        }
    }

    const goToSinglePage = async (page) => {
        loaderDispatch(setLoader({
            showLoader: true
        }))
        try {
            const url = `${URL_API}/catalogos/expedientes-search/?size=${size}&page=${page}`
            const params = {
                method: 'POST',
                body: JSON.stringify({
                    'search': search
                }),
                headers: {
                    "Content-type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            }
            const respuesta = await fetch(url, params) //NO PONEMOS EL MÉTODO PORQUE "fetch" POR DEFECTO YA TRAE EL MÉTODO "GET"
            const resultado = await respuesta.json() //CREAMOS UN "JSON" 
            //console.log(resultado.expedientes.length)
            if (resultado.expedientes) {

                expedientesDispatch(setExpedientesList({ //MODIFICAMOS EL STATE PARA ACTUALIZAR LOS REGISTROS QUE SE MUESTRAN CON BASE EN LA BÚSQUEDA
                    expedientes: resultado.expedientes
                }))
                loaderDispatch(setLoader({
                    showLoader: false
                }))
                searchDispatch(setSearch({
                    search: search,
                    searchPagination: searchPagination,
                    search_total_expedientes: resultado.total_expedientes
                }))
                paginationDispatch(setPagination({
                    paginas: resultado.paginas,
                    pagina: resultado.siguiente_pagina,
                    paginaSiguiente: resultado.siguiente_pagina,
                    paginaActual: resultado.pagina_actual,
                    paginaAnterior,
                    totalPaginas: resultado.total_de_paginas,
                }))
            } else {
                loaderDispatch(setLoader({
                    showLoader: false
                }))
                modalDispatch(setModal({ //MOSTRAMOS EL MENSAJE DE SUCCESS
                    showModalMessage: true
                }))
                errorMessageDispatch(setErrorMessage({
                    showErrorMessage: true,
                    errorMessage: resultado.message
                }))
            }

        } catch (error) {
            console.log(error)
        }
    }


    const handleGoToLastPage = async (lastPage) => {
        loaderDispatch(setLoader({
            showLoader: true
        }))
        try {
            const url = `${URL_API}/catalogos/expedientes-search/?size=${size}&page=${lastPage}`
            const params = {
                method: 'POST',
                body: JSON.stringify({
                    'search': search
                }),
                headers: {
                    "Content-type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            }
            const respuesta = await fetch(url, params) //NO PONEMOS EL MÉTODO PORQUE "fetch" POR DEFECTO YA TRAE EL MÉTODO "GET"
            const resultado = await respuesta.json() //CREAMOS UN "JSON" 
            //console.log(resultado.expedientes.length)
            if (resultado.expedientes) {

                expedientesDispatch(setExpedientesList({ //MODIFICAMOS EL STATE PARA ACTUALIZAR LOS REGISTROS QUE SE MUESTRAN CON BASE EN LA BÚSQUEDA
                    expedientes: resultado.expedientes
                }))
                loaderDispatch(setLoader({
                    showLoader: false
                }))
                searchDispatch(setSearch({
                    search: search,
                    searchPagination: searchPagination,
                    search_total_expedientes: resultado.total_expedientes
                }))
                paginationDispatch(setPagination({
                    paginas: resultado.paginas,
                    pagina: resultado.siguiente_pagina,
                    paginaSiguiente: resultado.siguiente_pagina,
                    paginaActual: resultado.pagina_actual,
                    paginaAnterior,
                    totalPaginas: resultado.total_de_paginas,
                }))
            } else {
                loaderDispatch(setLoader({
                    showLoader: false
                }))
                modalDispatch(setModal({ //MOSTRAMOS EL MENSAJE DE SUCCESS
                    showModalMessage: true
                }))
                errorMessageDispatch(setErrorMessage({
                    showErrorMessage: true,
                    errorMessage: resultado.message
                }))
            }

        } catch (error) {
            console.log(error)
        }
    }


    const handleGoToPreviousPage = async (paginaSiguiente) => {
        loaderDispatch(setLoader({
            showLoader: true
        }))
        try {
            const url = `${URL_API}/catalogos/expedientes-search/?size=${size}&page=${paginaSiguiente}`
            const params = {
                method: 'POST',
                body: JSON.stringify({
                    'search': search
                }),
                headers: {
                    "Content-type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            }
            const respuesta = await fetch(url, params) //NO PONEMOS EL MÉTODO PORQUE "fetch" POR DEFECTO YA TRAE EL MÉTODO "GET"
            const resultado = await respuesta.json() //CREAMOS UN "JSON" 
            //console.log(resultado.expedientes.length)
            if (resultado.expedientes) {

                expedientesDispatch(setExpedientesList({ //MODIFICAMOS EL STATE PARA ACTUALIZAR LOS REGISTROS QUE SE MUESTRAN CON BASE EN LA BÚSQUEDA
                    expedientes: resultado.expedientes
                }))
                loaderDispatch(setLoader({
                    showLoader: false
                }))
                searchDispatch(setSearch({
                    search: search,
                    searchPagination: searchPagination,
                    search_total_expedientes: resultado.total_expedientes
                }))
                paginationDispatch(setPagination({
                    paginas: resultado.paginas,
                    pagina: resultado.siguiente_pagina,
                    paginaSiguiente: resultado.siguiente_pagina,
                    paginaActual: resultado.pagina_actual,
                    paginaAnterior,
                    totalPaginas: resultado.total_de_paginas,
                }))
            } else {
                loaderDispatch(setLoader({
                    showLoader: false
                }))
                modalDispatch(setModal({ //MOSTRAMOS EL MENSAJE DE SUCCESS
                    showModalMessage: true
                }))
                errorMessageDispatch(setErrorMessage({
                    showErrorMessage: true,
                    errorMessage: resultado.msg
                }))
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="center-pagination">
            <ul className="pagination">
                {paginaActual > 1 ? (
                    <li>
                        <button className='previous'
                            onClick={() => handleGoToPreviousPage(paginaActual - 1)}
                        >
                            <svg className="w-6 h-6 pagination-btn-arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" >
                                <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
                            </svg>

                        </button>
                    </li>
                ) : ''}
                {paginas.length > 0 && paginas.length < 12 ? (
                    paginas.map((item, index) => {
                        return (
                            <li
                                key={index}
                            >
                                <button
                                    className={paginaActual == item ? "page active" : 'page'} href="#"
                                    onClick={() => goToSinglePage(item)}
                                >
                                    {item}
                                </button>
                            </li>
                        )
                    })
                ) : (
                    <>
                        <li
                        >
                            <button
                                className="page active" href="#"
                            >
                                {paginaActual}
                            </button>
                        </li>
                        {paginaActual < totalPaginas ? (
                            <>
                                <li className='page-separator'>
                                    de
                                </li>
                                <li
                                >
                                    <button
                                        className="page active"
                                        onClick={() => handleGoToLastPage(totalPaginas)}
                                    >
                                        {totalPaginas}
                                    </button>
                                </li>
                            </>
                        ) : ''
                        }
                    </>
                )
                }
                <li>
                    <button className='next'
                        onClick={() => handleGoToNextPage(paginaActual + 1)}
                    >
                        <svg className="w-6 h-6 pagination-btn-arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
                        </svg>

                    </button>
                </li>
            </ul>
        </div>
    )
}