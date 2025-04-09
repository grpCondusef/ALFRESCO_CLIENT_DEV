import React, { useEffect, useState } from 'react'
import moment from 'moment' //PARA FORMATEAR LAS FECHAS
import { Link, useNavigate, useParams } from 'react-router-dom'
import { CONDUSEF_TOKEN, URL_API } from '../../utils/constants'
import './CSS/Documents.css'
import { Modal } from '../../components/Modal'
import { Loader } from '../../components/Loader';
import { AddDocumentsForm } from './Components/AddDocumentsForm';
import { useDispatch, useSelector } from 'react-redux'
import { setModal } from '../../reducers/modalSlice/modalSlice'
import { setExpedienteInfo } from '../../reducers/expedienteSlice.js/expedienteSlice'
import { setLoader } from '../../reducers/loaderSlice/loaderSlice';
import { eliminarExpediente } from './fetchCalls/eliminarExpediente'
import { getExpedienteInfo } from './fetchCalls/getExpedienteInfo'
import { getDocuments } from './fetchCalls/getDocuments'
import { generarIntegrado } from './fetchCalls/generarIntegrado'
import { SuccesMessage } from '../../components/SuccesMessage'
import ErrorMessage from '../../components/ErrorMessage'
import { MessageModal } from './Components/MessageModal'
import { handleVerPortada } from './fetchCalls/handleVerPortada'
import { generarIntegradoFoliado } from './fetchCalls/generarIntegradoFoliado'
import upload_icon from '../../img/icons/upload-icon.svg'
import generar_integrado from '../../img/icons/pdf-integrado-icon.png'
import folder_icon from '../../img/icons/folder-icon.png'
import remove_icon from '../../img/icons/remove-client.png'
import export_document_icon from '../../img/icons/export-pdf-icon.png'

export const Documents = () => {

    const token = localStorage.getItem(CONDUSEF_TOKEN)
    const { expediente_id } = useParams()
    const documentsIds = []
    const [documents, setDocuments] = useState([])
    const [errorGenerarIntegrado, setErrorGenerarIntegrado] = useState(false)
    const [selectedCheckboxes, setSelectedCheckboxes] = useState({});
    const [selectAllDocument, setSelectAllDocument] = useState(true)
    const [cca, setCCA] = useState('')
    const modalDispatch = useDispatch()
    const loaderDispatch = useDispatch()
    const expedienteInfoDispatch = useDispatch()
    const [pdfUrl, setPdfUrl] = useState('')
    const navigate = useNavigate()
    const { id, eliminar_expedientes, subir_documentos, eliminar_documentos } = useSelector(state => state.auth)
    const { clave, fechaCreacion } = useSelector(state => state.expedienteInfo) //CONSUMIMOS EL STATE A TRAVÉS DE REDUX
    const { showModalMessage, showModalPDF, showModalUploadPDF } = useSelector(state => state.modal) //CONSUMIMOS EL STATE A TRAVÉS DE REDUX
    const { showLoader } = useSelector(state => state.loader) //CONSUMIMOS EL STATE A TRAVÉS DE REDUX
    const { showErrorMessage, errorMessage } = useSelector(state => state.errorMessage)
    let expedientTotalPages = 0


    const timeout = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    useEffect(() => {
        getDocuments(token, expediente_id, loaderDispatch, setLoader, setDocuments, setCCA)
        getExpedienteInfo(token, expediente_id, expedienteInfoDispatch, setExpedienteInfo)
    }, [])

    const selectDocument = (document_id) => {
        setSelectedCheckboxes(prevState => {
            if (prevState.hasOwnProperty(document_id)) {
                const { [document_id]: _, ...newState } = prevState;
                return newState;
            } else {
                return {
                    ...prevState,
                    [document_id]: true
                };
            }
        });
    };

    const selectAllDocuments = () => {

        setSelectAllDocument(!selectAllDocument)

        if (selectAllDocument) {

            setSelectedCheckboxes(prevState => {

                const updatedCheckboxes = {};

                documentsIds.forEach(document_id => {
                    updatedCheckboxes[document_id] = true;
                });

                return {
                    ...prevState,
                    ...updatedCheckboxes
                };
            });
        } else {
            setSelectedCheckboxes({})
        }

    };


    const hideMenu = () => {
        setSelectedCheckboxes({})
    }

    const deleteSelectedDocuments = async () => {

        const selectedDocumentsData = {
            'selected_documents': Object.keys(selectedCheckboxes).map(Number)
        }

        const confirmar = confirm('Desea eliminar los documentos seleccionados?')
        if (confirmar & Object.keys(selectedCheckboxes).length > 0) {

            try {
                const url = `${URL_API}/digitalizacion/delete-selected-documents/` //SELECCIONAMOS CLIENTE POR SU "id"
                const respuesta = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(selectedDocumentsData),
                    headers: {
                        "Content-type": "application/json",
                        'Authorization': `Bearer ${token}`
                    }
                }) //NO PONEMOS EL MÉTODO PORQUE "fetch" POR DEFECTO YA TRAE EL MÉTODO "GET"
                const resultado = await respuesta.json() //CREAMOS UN "JSON" QUE CONTENGA LOS DATOS DEL CLIENTE SELECCIONADO
                window.location.reload(false)

            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleViewPDF = (uploadedFile) => {
        loaderDispatch(setLoader({
            showLoader: true
        }))
        setPdfUrl(`${URL_API}/files/` + uploadedFile)
        modalDispatch(setModal({
            showModalPDF: true,
        }))
        loaderDispatch(setLoader({
            showLoader: false
        }))
    }

    var animateButton = function (event) {
        event.target.classList.remove('animate');
        event.target.classList.add('animate');
        setTimeout(function () {
            event.target.classList.remove('animate');
        }, 700);
    };

    const reloadPortada = async (e) => {

        e.stopPropagation(); // Evita que el evento se propague al botón
        const button = e.target.closest(".reload-portada-btn"); // Encuentra el elemento del botón más cercano

        button.classList.remove('animate');
        button.classList.add('animate');
        setTimeout(function () {
            button.classList.remove('animate');
        }, 700);

        try {
            const url = `${URL_API}/digitalizacion/actualizar-portada/?expediente_id=${expediente_id}`
            const params = {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            const respuesta = await fetch(url, params);
            const resultado = await respuesta.json();
            //console.log(resultado.expedientes.length)

        } catch (error) {
            console.log(error)
        }

    };


    const handleOpenUploadForm = () => {
        modalDispatch(setModal({
            showModalUploadPDF: true,
        }))
    }

    const errorMessagePortada = async () => {
        loaderDispatch(setLoader({
            showLoader: false
        }))
        modalDispatch(setModal({ //MOSTRAMOS EL MENSAJE DE SUCCESS
            showModalSuccess: false,
            showModalPDF: false,
            showModalUploadPDF: false
        }))
        await timeout(2000); //MOSTRAMOS EL MENSAJE 2 SEGUNDOS Y RECARGAMOS LA PÁGINA
        window.location.reload(false)
    }

    return (
        <div>
            {showErrorMessage && showModalMessage ? (
                <Modal>
                    <ErrorMessage>
                        {errorMessage}
                    </ErrorMessage>
                </Modal>
            ) : ''}

            {showModalMessage && !showErrorMessage ? (
                <Modal>
                    <SuccesMessage >
                        El documento se ha agregado exitosamente!!!
                    </SuccesMessage>
                </Modal>
            ) : ''}

            {showLoader ? <Loader /> : ''}

            {showModalPDF ? (
                <Modal >
                    <embed src={pdfUrl} style={{ minWidth: "90vw", minHeight: "80vh" }} />
                    <p>Si no puede visualizar el pdf - ingrese al siguiente link para <a href={pdfUrl}>obtener el PDF!</a></p>
                </Modal>
            ) : ''}

            {showModalUploadPDF ? (
                <Modal>
                    <AddDocumentsForm />
                </Modal>
            ) : ''}

            {errorGenerarIntegrado ? (
                <MessageModal>
                    <ErrorMessage>
                        <h3>Es necesario visualizar la portada antes de generar el integrado.</h3>
                    </ErrorMessage>
                </MessageModal>
            ) : ''}

            {showLoader ? <Loader /> : ''}

            <div className="documents-title-container">
                <h2>Documentos</h2>
            </div>

            <div className="documents-buttons-container">
                <Link
                    className="btn-documents-regresar"
                    to={'/expedientes-list/'}
                >Regresar
                </Link>
                {subir_documentos ? (
                    <button
                        className="btn-documents-tarea"
                        type="submit"
                        onClick={handleOpenUploadForm}
                    >
                        <img src={upload_icon} alt=""
                            className="upload-icon-btn-documents" />
                        <span className="btn-select-name">
                            Subir documento
                        </span>
                    </button>
                ) : ''}
                <button
                    className="btn-generar-integrado"
                    type="submit"
                    onClick={() => generarIntegrado(token, cca, clave, expediente_id, loaderDispatch, setLoader, setPdfUrl, modalDispatch, setModal, setErrorGenerarIntegrado, errorMessagePortada)}
                >
                    <img src={generar_integrado} alt=""
                        className="upload-icon-btn-documents" />
                    <span className="btn-select-name">
                        Generar Integrado
                    </span>
                </button>

                {Object.keys(selectedCheckboxes).length > 0 ?
                    <button
                        className="btn-generar-integrado"
                        type="submit"
                        onClick={() => generarIntegradoFoliado(token, cca, clave, expediente_id, selectedCheckboxes, loaderDispatch, setLoader, setPdfUrl, modalDispatch, setModal, setErrorGenerarIntegrado, errorMessagePortada)}
                    >
                        <img src={generar_integrado} alt=""
                            className="upload-icon-btn-documents" />
                        <span className="btn-select-name">
                            Generar Integrado y foliarlo
                        </span>
                    </button>
                    : ''}

                {eliminar_expedientes ? (
                    <button
                        className="btn-eliminar-expediente"
                        type="submit"
                        onClick={() => eliminarExpediente(token, expediente_id, clave, navigate)}
                    >
                        <img src={remove_icon} alt=""
                            className="upload-icon-btn-documents" />
                        <span className="btn-select-name">
                            Eliminar
                        </span>
                    </button>
                ) : ''}
            </div>


            <div className="documents-container">


                {Object.keys(selectedCheckboxes).length > 0 ? (
                    <div className='selected-document-options-container'>
                        <button
                            className='cancel-delet-document-btn'
                            onClick={hideMenu}
                        >
                            <svg className="w-6 h-6 cancel-delet-document-btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <span>{Object.keys(selectedCheckboxes).length} Seleccionados</span>

                        {eliminar_documentos ? (
                            <button
                                className='delete-document-btn'
                                onClick={deleteSelectedDocuments}
                            >
                                <svg className="w-6 h-6 delete-document-btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                                </svg>
                            </button>
                        ) : ''}
                    </div>
                ) : (
                    <div className="cca-container">
                        <img className="folder-icon-btn-documents"
                            src={folder_icon} alt="" />
                        <p>{cca}</p>
                    </div>
                )}

                <table className="table-documents">
                    <thead className="table-header-documents">
                        <tr>
                            <th
                                className="column-field-head-documents select-document-table-checkbox"
                            >
                                <input
                                    id={`checkbox-select-all-documents_id`}
                                    className="checkbox-select-all-documents"
                                    type="checkbox"
                                    style={{ display: 'none' }}
                                    onClick={selectAllDocuments}
                                />

                                <label className="cbx" htmlFor={`checkbox-select-all-documents_id`}>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                            <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                </label>
                            </th>

                            <th className="column-field-head-documents">

                            </th>
                            <th className="column-field-head-documents">
                                Tipo
                            </th>
                            <th className="column-field-head-documents">
                                Fecha Creación
                            </th>
                            <th className="column-field-head-documents">
                                Páginas
                            </th>
                            <th className="column-field-head-documents">

                            </th>
                        </tr>
                    </thead>

                    <tbody className="table-body-documents">

                        <tr className="table-row-dpcuments">
                            <td className="field-documents">
                            </td>
                            <td className="field-documents">
                                <p>Portada</p>
                            </td>
                            <td className="field-documents">
                                <p>Portada</p>
                            </td>
                            <td className="field-documents">
                                <p>{moment(fechaCreacion).format('DD-MM-YYYY')}</p>
                            </td>
                            <td className="field-documents">
                                1
                            </td>
                            <td
                                className='pdf-reload-btns-container'
                            >
                                <button
                                    className="export-pdf-btn"
                                    onClick={() => handleVerPortada(token, expediente_id, clave, loaderDispatch, setLoader, setPdfUrl, modalDispatch, setModal)}
                                >
                                    <img className="export-pdf-icon" src={export_document_icon} alt="" />
                                </button>


                                <button
                                    type='button'
                                    className='reload-portada-btn bubbly-button'
                                    onClick={(e) => reloadPortada(e)}
                                >
                                    <svg
                                        onClick={(e) => reloadPortada(e)}
                                        className="reload-portada-btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </td>
                        </tr>

                        {documents.length > 0 ? (
                            documents.map((item, index) => {
                                const { document_id, name, tipo, uploadedFile, date_creation, total_pages } = item
                                expedientTotalPages += total_pages
                                documentsIds.push(document_id)
                                return (
                                    <tr
                                        key={document_id}
                                        id={document_id}
                                        className={`${document_id in selectedCheckboxes ? 'selected-document-row' : ''} table-row-dpcuments`}
                                    >
                                        <td className="field-documents ">
                                            <input
                                                id={`cbx-${document_id}`}
                                                className="inp-cbx"
                                                type="checkbox"
                                                style={{ display: 'none' }}
                                                checked={selectedCheckboxes[document_id] || ''}
                                                onChange={() => selectDocument(document_id)}
                                            />

                                            <label className="cbx" htmlFor={`cbx-${document_id}`}>
                                                <span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                        <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                                                    </svg>
                                                </span>
                                            </label>

                                        </td>


                                        <td className="field-documents">
                                            <p>{index + 1}</p>
                                        </td>
                                        <td className="field-documents">
                                            <p>{tipo}</p>
                                        </td>
                                        <td className="field-documents">
                                            <p>{moment(date_creation).format('DD-MM-YYYY')}</p>
                                        </td>
                                        <td className="field-documents">
                                            <p>{total_pages}</p>
                                        </td>
                                        <td>
                                            <button
                                                className="export-pdf-btn"
                                                onClick={() => handleViewPDF(uploadedFile)}
                                            >
                                                <img className="export-pdf-icon" src={export_document_icon} alt="" />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        ) : <tr></tr>
                        }
                        <tr className='total-pages-tr'>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>Total:</td>
                            <td>{expedientTotalPages}</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
    )
}
