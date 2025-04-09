import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from "formik"; //LO USAMOS PARA CREAR FORMULARIOS
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../../../reducers/modalSlice/modalSlice';
import { CONDUSEF_TOKEN } from '../../../utils/constants'
import { handleAddDocument } from '../fetchCalls/handleAddDocument';
import { setLoader } from '../../../reducers/loaderSlice/loaderSlice';
import { setErrorMessage } from '../../../reducers/errorMessageSlice/errorMessageSlice';


export const AddDocumentsForm = () => {

    const token = localStorage.getItem(CONDUSEF_TOKEN)
    const { id, clave } = useSelector(state => state.expedienteInfo) //CONSUMIMOS EL STATE A TRAVÉS DE REDUX
    const { showModalUploadPDF } = useSelector(state => state.modal) //CONSUMIMOS EL STATE A TRAVÉS DE REDUX
    const modalDispatch = useDispatch()
    const loaderDispatch = useDispatch()
    const [pdfFile, setpdfFile] = useState('')
    const errorMessageDispatch = useDispatch()

    const handleCloseUploadForm = () => {
        modalDispatch(setModal({
            showModalUploadPDF: false,
        }))
    }

    const reader = new FileReader();
    const onFileChange = (e) => {
        const file = e.target.files[0]
        reader.readAsDataURL(file)
        setpdfFile(file)

        const input = document.getElementById('pdf-input')
        input.innerHTML = 'Selecciona'
    }

    return (
        <Formik
            initialValues={{
                //INICIALIZAMOS LOS VALORES DE LOS CAMPOS
                pdf: "", //USAMOS EL "name" DEL CAMPO
                title: "", //USAMOS EL "name" DEL CAMPO
            }}
            onSubmit={() => {
                handleAddDocument(token, loaderDispatch, setLoader, modalDispatch, setModal, id, clave, pdfFile, errorMessageDispatch, setErrorMessage)
            }}
        >
            <Form>
                <p>Subir archivo para el expediente con CCA {clave}</p>
                <div className="pdf-field-container" >
                    <Field
                        className='add-pdf-input'
                        type='file'
                        name='pdf'
                        id='pdf-input'
                        accept=".pdf" 
                        onChange={onFileChange}
                    />
                    {pdfFile !== '' ? <p className='pdf-name'>Archivo Seleccionado: {pdfFile.name}</p> : ''}
                </div>
                <Field type='text' name='title' style={{ visibility: "hidden" }} />
                <Field type='text' name='expediente' style={{ visibility: "hidden" }} />


                <div className='pdf-btn-container'>
                    <button
                        onClick={handleCloseUploadForm}
                        className='cancel-pdf-btn'
                    >
                        Cancelar
                    </button>
                    <button
                        className='upload-pdf-btn'
                        type='submit'
                    >
                        Agregar documento
                    </button>
                </div>
            </Form>
        </Formik>
    )
}
