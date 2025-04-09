import React from 'react'
import { Formik, Form, Field } from "formik"; //LO USAMOS PARA CREAR FORMULARIOS
import { CONDUSEF_TOKEN } from '../utils/constants'
import search_expediente_icon from '../img/icons/search-expediente-icon.png'
import '../CSS/SearchBox.css'
import { useDispatch, useSelector } from 'react-redux';
import { setExpedientesList } from '../reducers/expedientesListSlice/expedientesListSlice';
import { setLoader } from '../reducers/loaderSlice/loaderSlice';
import { setPagination } from '../reducers/paginationSlice/paginationSlice';
import { setSearch } from '../reducers/searchSlice/searchSlice';
import { handleBuscarExpediente } from '../utils/fetchCalls/handleBuscarExpediente';
import { getExpedientes } from '../utils/fetchCalls/getExpedientes';
import { setErrorMessage } from '../reducers/errorMessageSlice/errorMessageSlice';
import { setModal } from '../reducers/modalSlice/modalSlice';

const SearchBox = () => {

    const token = localStorage.getItem(CONDUSEF_TOKEN)
    const expedientesDispatch = useDispatch()
    const loaderDispatch = useDispatch()
    const modalDispatch = useDispatch()
    const errorMessageDispatch = useDispatch()
    const paginationDispatch = useDispatch()
    const searchDispatch = useDispatch()
    const { paginas, pagina, paginaActual, paginaSiguiente, paginaAnterior, totalPaginas } = useSelector(state => state.pagination) //CONSUMIMOS EL STATE A TRAVÉS DE REDUX
    const size = 10

    return (
        <Formik

            initialValues={{
                //INICIALIZAMOS LOS VALORES DE LOS CAMPOS
                search: "",
            }}
            onSubmit={(values) => {
                search.value.length > 0 ?
                    handleBuscarExpediente(token, size, values, loaderDispatch, setLoader, expedientesDispatch, setExpedientesList, searchDispatch, setSearch, paginationDispatch, setPagination, paginaActual, paginaSiguiente, paginaAnterior, modalDispatch, errorMessageDispatch, setErrorMessage)
                    : ''
            }}
        >
            <Form
                className='search-form'>
                <div className="">
                    <Field
                        name="search"
                        id="search"
                        type="search"
                        className="search-input"
                        placeholder="Buscar expediente..."
                    />
                </div>
                <button
                    type='submit'
                    className='btn-search'
                >
                    <img src={search_expediente_icon} alt="" />
                </button>
            </Form>
        </Formik>
    )
}

export default SearchBox
