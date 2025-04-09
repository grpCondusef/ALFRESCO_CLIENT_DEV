import React from 'react'
import { useState } from 'react';
import { Formik, Form, Field } from "formik"; //LO USAMOS PARA CREAR FORMULARIOS
import * as XLSX from "xlsx";
import './CSS/MassiveUpload.css'
import { CONDUSEF_TOKEN, URL_API } from '../../utils/constants';
import { BarsLoader } from './Components/BarsLoader';
import { Modal } from '../../components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '../../reducers/loaderSlice/loaderSlice';
import { SuccesMessage } from '../../components/SuccesMessage';
import { setModal } from '../../reducers/modalSlice/modalSlice';
import ErrorMessage from '../../components/ErrorMessage';
import { setErrorMessage } from '../../reducers/errorMessageSlice/errorMessageSlice';

const MassiveUpload = () => {

    const token = localStorage.getItem(CONDUSEF_TOKEN)
    const loaderDispatch = useDispatch()
    const modalDispatch = useDispatch()
    const errorMessageDispatch = useDispatch()
    const { showLoader } = useSelector(state => state.loader) //CONSUMIMOS EL STATE A TRAVÉS DE REDUX
    const { showModalMessage, showModalPDF, showModalUploadPDF } = useSelector(state => state.modal) //CONSUMIMOS EL STATE A TRAVÉS DE REDUX
    const { showErrorMessage, errorMessage } = useSelector(state => state.errorMessage)
    const [items, setItems] = useState([]);
    const [excelFile, setExcelFile] = useState('')
    const [selectNewFile, setSelectNewFile] = useState(false)
    const [expedientesCreados, setExpedientesCreados] = useState([])

    const timeout = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const formData = new FormData();
    const handleAddMassiveUpload = async () => {

        formData.append("CARGA_MASIVA_FILE", excelFile)

        if (excelFile !== '') {

            const confirmar = confirm('Iniciar carga masiva?')

            if (confirmar) {

                //console.log(...formData)

                loaderDispatch(setLoader({
                    showLoader: true
                }))

                try {
                    const url = `${URL_API}/catalogos/carga-masiva-expedientes/` //SELECCIONAMOS CLIENTE POR SU "id"
                    const respuesta = await fetch(url, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })

                    if (respuesta.status === 200) {
                        //NO PONEMOS EL MÉTODO PORQUE "fetch" POR DEFECTO YA TRAE EL MÉTODO "GET"
                        const resultado = await respuesta.json() //CREAMOS UN "JSON" QUE CONTENGA LOS DATOS DEL CLIENTE SELECCIONADO

                        const { expedientes_creados } = resultado

                        loaderDispatch(setLoader({
                            showLoader: false
                        }))

                        modalDispatch(setModal({ //MOSTRAMOS EL MENSAJE DE SUCCESS
                            showModalMessage: true,
                            showModalPDF: false,
                            showModalUploadPDF: false
                        }))
                        await timeout(1900); //MOSTRAMOS EL MENSAJE 2 SEGUNDOS Y RECARGAMOS LA PÁGINA

                        modalDispatch(setModal({ //MOSTRAMOS EL MENSAJE DE SUCCESS
                            showModalMessage: false,
                            showModalPDF: false,
                            showModalUploadPDF: false
                        }))

                        setExpedientesCreados(expedientes_creados)
                    } else {
                        loaderDispatch(setLoader({
                            showLoader: false
                        }))
                        modalDispatch(setModal({ //MOSTRAMOS EL MENSAJE DE ERROR
                            showModalMessage: true,
                            showModalPDF: false,
                            showModalUploadPDF: false
                        }))
                        errorMessageDispatch(setErrorMessage({
                            showErrorMessage: true,
                            errorMessage: 'Parece ser que ha habido un error, intente de nuevo!'
                        }))
                    }

                } catch (error) {
                    console.log(error)
                    loaderDispatch(setLoader({
                        showLoader: false
                    }))
                    modalDispatch(setModal({ //MOSTRAMOS EL MENSAJE DE ERROR
                        showModalMessage: true,
                        showModalPDF: false,
                        showModalUploadPDF: false
                    }))
                    errorMessageDispatch(setErrorMessage({
                        showErrorMessage: true,
                        errorMessage: 'Parece ser que ha habido un error, intente de nuevo!'
                    }))
                }
            }
        }
    }

    const readExcel = (file) => {
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);

            fileReader.onload = (e) => {
                const bufferArray = e.target.result;
                const wb = XLSX.read(bufferArray, { type: "buffer" });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = XLSX.utils.sheet_to_json(ws);

                resolve(data);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });

        promise.then((d) => {
            setItems(d);
        });
    };

    const reader = new FileReader();
    const onFileChange = (e) => {
        const file = e.target.files[0]
        reader.readAsDataURL(file)

        console.log(file)
        setExcelFile(file)
        setSelectNewFile(true)
        //
        const input = document.getElementById('excel-input')
        input.innerHTML = 'Selecciona'
    }

    const newMassiveBtn = () => {
        window.location.reload(false) //RECARGAMOS EL COMPONENTE UNA VEZ QUE HAYAMOS ENVIADO LOS DATOS
    }

    return (
        <div className='massive-upload-container'>
            {expedientesCreados.length > 0 ? (
                <>
                    <div className='massive-upload-title-container'>
                        <h1>Expedientes creados</h1>
                    </div>
                    <div className='new_massive-upload-btn-container'>
                        <button
                            className='create-massive-upload'
                            onClick={newMassiveBtn}
                        >
                            Nueva carga masiva
                            <svg className="w-6 h-6 massive-upload-icon-btn" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                            </svg>
                        </button>
                    </div>
                    <table className='massive-success-uploaded-table'>
                        <thead className='massive-upload-table-thead'>
                            <tr>
                                <th className='massive-upload-table-th'>#</th>
                                <th className='massive-upload-table-th'>Folio</th>
                                <th className='massive-upload-table-th'>Clave Archivística</th>
                            </tr>
                        </thead>
                        <tbody>
                            {expedientesCreados.map((item, index) => {
                                return (
                                    <tr
                                        key={index}
                                        className='massive-success-upload-row'
                                    >
                                        <td className='massiveUpload-td'>{index + 1}</td>
                                        <td className='massiveUpload-td'>{item.folioSIO}</td>
                                        <td className='massiveUpload-td'>{item.clave}</td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                </>
            ) : (
                <>
                    {showErrorMessage && showModalMessage ? (
                        <Modal>
                            <ErrorMessage>
                                {errorMessage}
                            </ErrorMessage>
                        </Modal>
                    ) : ''}
                    {showLoader ? <BarsLoader /> : ''}
                    {showModalMessage  && !showErrorMessage ? (
                        <Modal>
                            <SuccesMessage>
                                La carga masiva ha concluido exitosamente!!!
                            </SuccesMessage>
                        </Modal>
                    ) : ''}
                    <div className='massive-upload-title-container'>
                        <h1>Carga masiva de expedientes digitales</h1>
                    </div>
                    <div className='download-layout-link-container'>
                        <a className='download-layout-link' href="http://10.33.1.238:8000/files/exceles/PLANTILLA_CARGA_MASIVA.xlsx" download="Acme Documentation (ver. 2.0.1).txt">
                            Descargar plantilla
                            <svg className="w-6 h-6 download-layout-link-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg>

                        </a>
                    </div>
                    <Formik
                        initialValues={{
                            //INICIALIZAMOS LOS VALORES DE LOS CAMPOS
                            excel: "" //USAMOS EL "name" DEL CAMPO
                        }}

                        onSubmit={() => {
                            handleAddMassiveUpload()
                        }}
                    >
                        <Form className='massive-upload-form'>
                            <Field
                                className={excelFile ? 'file-excel-input-select-new-file' : 'file-excel-input'}
                                type='file'
                                name='excel'
                                id='excel-input'
                                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                onChange={(e) => {

                                    const file = e.target.files[0]
                                    //
                                    readExcel(file)

                                    onFileChange(e)
                                }}
                            />
                            {excelFile !== '' ? <p className='pdf-name'>Archivo Seleccionado: {excelFile.name}</p> : ''}
                            {excelFile !== '' ?
                                (
                                    <div className='pdf-btn-container'>
                                        <button
                                            className='create-massive-upload'
                                            type='submit'
                                        >
                                            Crear {items.length} expedientes
                                            <svg className="w-6 h-6 massive-upload-icon-btn" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                            </svg>
                                        </button>
                                    </div>
                                )
                                : ''}
                        </Form>
                    </Formik>
                    {items.length > 0 ? (

                        <div className='massive-upload-table-container'>
                            <table className='massive-upload-table'>
                                <thead className='massive-upload-table-thead'>
                                    <tr>
                                        <th className='massive-upload-table-th'>#</th>
                                        <th className='massive-upload-table-th'>fechaCreacion</th>
                                        <th className='massive-upload-table-th'>fechaApertura</th>
                                        <th className='massive-upload-table-th'>folioSIO</th>
                                        <th className='massive-upload-table-th'>formatoSoporte</th>
                                        <th className='massive-upload-table-th'>idAreaProcedenciaN_id</th>
                                        <th className='massive-upload-table-th'>idAreaSIO_id</th>
                                        <th className='massive-upload-table-th'>idEstatus_id</th>
                                        <th className='massive-upload-table-th'>idInstitucion_id</th>
                                        <th className='massive-upload-table-th'>idMacroproceso_id</th>
                                        <th className='massive-upload-table-th'>idProceso_id</th>
                                        <th className='massive-upload-table-th'>idSerie_id</th>
                                        <th className='massive-upload-table-th'>idSubserie</th>
                                        <th className='massive-upload-table-th'>idTipoMacroproceso_id</th>
                                        <th className='massive-upload-table-th'>reclamante</th>
                                        <th className='massive-upload-table-th'>resumenContenido</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((d, index) => {
                                        const fechaCreacion = new Date((d.fechaCreacion - 25568) * 86400 * 1000);
                                        const formattedFechaCreacion = fechaCreacion.toLocaleDateString('es-MX');
                                        const fechaApertura = new Date((d.fechaApertura - 25568) * 86400 * 1000);
                                        const formattedFechaApertura = fechaApertura.toLocaleDateString('es-MX');
                                        return (
                                            <tr
                                                key={index}
                                                className='massive-upload-row'
                                            >
                                                <td className='massiveUpload-td'>{index + 1}</td>
                                                <td className='massiveUpload-td'>{formattedFechaCreacion}</td>
                                                <td className='massiveUpload-td'>{formattedFechaApertura}</td>
                                                <td className='massiveUpload-td'>{d.folioSIO}</td>
                                                <td className='massiveUpload-td'>{d.formatoSoporte}</td>
                                                <td className='massiveUpload-td'>{d.idAreaProcedenciaN_id}</td>
                                                <td className='massiveUpload-td'>{d.idAreaSIO_id}</td>
                                                <td className='massiveUpload-td'>{d.idEstatus_id}</td>
                                                <td className='massiveUpload-td'>{d.idInstitucion_id}</td>
                                                <td className='massiveUpload-td'>{d.idMacroproceso_id}</td>
                                                <td className='massiveUpload-td'>{d.idProceso_id}</td>
                                                <td className='massiveUpload-td'>{d.idSerie_id}</td>
                                                <td className='massiveUpload-td'>{d.idSubserie}</td>
                                                <td className='massiveUpload-td'>{d.idTipoMacroproceso_id}</td>
                                                <td className='massiveUpload-td'>{d.reclamante}</td>
                                                <td className='massiveUpload-td'>{d.resumenContenido}</td>
                                            </tr>
                                        )
                                    })}

                                </tbody>
                            </table>
                        </div>
                    ) : ''}

                </>
            )}
        </div>
    )
}

export default MassiveUpload
