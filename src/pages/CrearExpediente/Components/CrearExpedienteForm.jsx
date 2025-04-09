import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from "formik"; //LO USAMOS PARA CREAR FORMULARIOS
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CONDUSEF_TOKEN } from '../../../utils/constants'
import { getTipoMacroProcesoOptions } from '../fetchCalls/getTipoMacroProcesoOptions';
import { getMacroProcesoOptions } from '../fetchCalls/getMacroprocesoOptions';
import { getProcesoOptions } from '../fetchCalls/getProcesoOptions';
import { getSerieOptions } from '../fetchCalls/getSerieOptions';
import { getInstitucionesFinancieras } from '../fetchCalls/getInstitucionesFinancieras';
import { handleCrearExpediente } from '../fetchCalls/handleCrearExpediente';
import { AutocompleteField } from './AutocompleteField';
import { setErrorMessage } from '../../../reducers/errorMessageSlice/errorMessageSlice';
import { setModal } from '../../../reducers/modalSlice/modalSlice';
import { getTodaysDate } from '../../../helpers/getTodaysDate';
import { setLoader } from '../../../reducers/loaderSlice/loaderSlice';

const CrearExpedienteForm = () => {

    const token = localStorage.getItem(CONDUSEF_TOKEN)
    const { area, area_id, idAreaSIO, areas_asociadas } = useSelector(state => state.auth) //CONSUMIMOS EL STATE A TRAVÉS DE REDUX
    const modalDispatch = useDispatch() 
    const errorMessageDispatch = useDispatch()
    const loaderDispatch = useDispatch()
    const navigate = useNavigate();
    const [areaId, setAreaId] = useState('')
    const [tipoMacroprocesoOptions, setTipoMacroprocesoOptions] = useState([])
    const [tipoMacroproceso, setTipoMacroproceso] = useState('')
    const [Macroprocesos, setMacroprocesos] = useState([])
    const [macroproceso, setMacroproceso] = useState('')
    const [procesos, setProcesos] = useState([])
    const [proceso, setProceso] = useState('')
    const [series, setSeries] = useState([])
    const [serie, setSerie] = useState('')
    const [institucionesFinancieras, setInstitucionesFinancieras] = useState(false)
    const [pori, setPori] = useState(false)
    const [institucionSeleccionada, setInstitucionSeleccionada] = useState('');
    const [camposVacios, setcamposVacios] = useState(false);

    const areaSelectedId = (e) => {
        setAreaId(e.target.value)
    }

    const tipoMacroprocesoSelected = (e) => {
        setTipoMacroproceso(e.target.value)
    }

    useEffect(() => {
        if (tipoMacroproceso !== '') {
            getMacroProcesoOptions(token, areaId, tipoMacroproceso, setMacroprocesos)
        }
    }, [tipoMacroproceso])

    const macroprocesoSelected = (e) => {
        setMacroproceso(e.target.value)
    }

    useEffect(() => {
        if (macroproceso !== '') {
            getProcesoOptions(token, areaId, tipoMacroproceso, macroproceso, setProcesos)
        }
    }, [macroproceso])

    const procesoSelected = (e) => {
        setProceso(e.target.value)
    }

    useEffect(() => {
        if (proceso !== '') {
            getSerieOptions(token, areaId, tipoMacroproceso, macroproceso, proceso, setSeries)
        }
    }, [proceso])

    const serieSelected = (e) => {
        setSerie(e.target.value)
    }

    useEffect(() => {

        if (serie !== '' && serie !== 30) {
            getInstitucionesFinancieras(token, setInstitucionesFinancieras)
        }
    }, [serie])

    useEffect(() => {
        if (areaId !== '') {
            getTipoMacroProcesoOptions(token, areaId, setTipoMacroprocesoOptions)
        }
    }, [areaId])

    const showPoriInput = () => {
        setPori(!pori)
    }

    const handleCancelar = () => {
        navigate('/menu/')
    }

    const isDisabledDate = (selectedDate) => {
        const disabledDates = ['2023-07-19', '2023-07-20', '2023-07-21'];

        return disabledDates.includes(selectedDate);
    };

    return (
        <Formik 
            initialValues={{
                //INICIALIZAMOS LOS VALORES DE LOS CAMPOS
                "idTipoMacroproceso": "",
                "idMacroproceso": "",
                "idProceso": "",
                "idSerie": "",
                "fechaApertura": "",
                "resumenContenido": "",
                "idAreaProcedenciaN": "",
                "folioSIO": "",
                "poriFolio": "",
                "reclamante": "",
                "idInstitucion": "",
                "formatoSoporte": ""
            }}
            onSubmit={(values) => {
                handleCrearExpediente(token, values, tipoMacroproceso, macroproceso, proceso, serie, area_id, idAreaSIO, institucionSeleccionada, setcamposVacios,loaderDispatch, setLoader, modalDispatch, setModal,  navigate, errorMessageDispatch, setErrorMessage)
            }} 
        >
            <Form className='add-expediente-form'>
                <div className="form-row-container">
                    <div className="col-25">
                        <label className="add-expediente-field-label">Área de procedencia*</label>
                    </div>
                    <div className="field-container">
                        <Field
                            as="select"
                            name="idAreaProcedenciaN"
                            className='add-expediente-field'
                            onChange={areaSelectedId}
                            value={areaId}
                        >
                            <option className='' value="">
                                --Selecciona una opción--
                            </option>
                            {areas_asociadas.map((item, index) => {
                                return (
                                    <option
                                        key={index}
                                        value={item.id}
                                    >
                                        {item.nombre}
                                    </option>
                                )
                            })}
                        </Field>
                    </div>
                </div>
                <div className="form-row-container">
                    <div className="col-25">
                        <label className="add-expediente-field-label">Tipo de macroproceso *</label>
                    </div>
                    <div className="field-container">
                        <Field
                            as="select"
                            name="idTipoMacroproceso"
                            className='add-expediente-field'
                            value={tipoMacroproceso}
                            onChange={tipoMacroprocesoSelected}
                        >
                            {tipoMacroprocesoOptions.length > 0 ? (
                                <option className='' value="">
                                    --Selecciona una opción--
                                </option>
                            ) : ''}
                            {tipoMacroprocesoOptions ? (
                                tipoMacroprocesoOptions.map(item => {
                                    const { tipo_macroproceso_id, tipo_macroproceso_nombre } = item
                                    return (
                                        <option
                                            key={tipo_macroproceso_id}
                                            value={tipo_macroproceso_id}
                                        >{tipo_macroproceso_nombre}
                                        </option>
                                    )
                                })) : ''}
                        </Field>
                    </div>
                </div>
                <div className="form-row-container">
                    <div className="col-25">
                        <label className="add-expediente-field-label">Macroproceso *</label>
                    </div>
                    <div className="field-container">
                        <Field
                            as="select"
                            name="idMacroproceso"
                            className='add-expediente-field'
                            value={macroproceso}
                            onChange={macroprocesoSelected}
                        >
                            {Macroprocesos.length > 0 ? (

                                <option className='' value="">
                                    --Selecciona una opción--
                                </option>
                            ) : ''}
                            {Macroprocesos.length > 0 ? (
                                Macroprocesos.map(item => {
                                    const { macroproceso_id, macroproceso_nombre } = item
                                    return (
                                        <option
                                            key={macroproceso_id}
                                            value={macroproceso_id}
                                        >
                                            {macroproceso_nombre}
                                        </option>
                                    )
                                })
                            ) : ''}
                        </Field>
                    </div>
                </div>
                <div className="form-row-container">
                    <div className="col-25">
                        <label className="add-expediente-field-label">Proceso *</label>
                    </div>
                    <div className="field-container">
                        <Field
                            as="select"
                            name="idProceso"
                            className='add-expediente-field'
                            value={proceso}
                            onChange={procesoSelected}
                        >
                            {procesos.length > 0 ? (

                                <option className='' value="">
                                    --Selecciona una opción--
                                </option>
                            ) : ''}
                            {procesos.length > 0 ? (
                                procesos.map(item => {
                                    const { proceso_id, proceso_nombre } = item
                                    return (
                                        <option
                                            key={proceso_id}
                                            value={proceso_id}
                                        >
                                            {proceso_nombre}
                                        </option>
                                    )
                                })
                            ) : ''}
                        </Field>
                    </div>
                </div>
                <div className="form-row-container">
                    <div className="col-25">
                        <label className="add-expediente-field-label">Serie *</label>
                    </div>
                    <div className="field-container">
                        <Field
                            as="select"
                            name="idSerie"
                            className='add-expediente-field'
                            value={serie}
                            onChange={serieSelected}
                        >
                            {series.length > 0 ? (

                                <option className='' value="">
                                    --Selecciona una opción--
                                </option>
                            ) : ''}
                            {series.length > 0 ? (
                                series.map(item => {
                                    const { serie_id, serie_nombre } = item
                                    return (
                                        <option
                                            key={serie_id}
                                            value={serie_id}
                                        >
                                            {serie_nombre}
                                        </option>
                                    )
                                })
                            ) : ''}
                        </Field>
                    </div>
                </div>
                <div className="form-row-container doble-field">
                    <div className='form-expediente-col'>
                        <div className="col-25">
                            <label className="add-expediente-field-label">Subserie</label>
                        </div>
                        <div className="doble-field-container">
                            <Field
                                type='text'
                                name="idSubserie"
                                className='add-expediente-doble-field suberie'
                            />
                        </div>
                    </div>
                    <div className='form-expediente-col'>
                        <div className="col-25">
                            <label className="add-expediente-field-label">Fecha de apertura *</label>
                        </div>
                        <div className="doble-field-container">
                            <Field
                                type='date'
                                name="fechaApertura"
                                className='add-expediente-doble-field'
                                max={getTodaysDate()}
                            />
                        </div>
                    </div>
                </div>
                {(tipoMacroproceso === '1' || tipoMacroproceso === '5') ? (
                    <div className="form-row-container doble-field">
                        <div className='form-expediente-col'>
                            <div className="col-25">
                                <label className="add-expediente-field-label">Folio SIO/Expediente *</label>
                            </div>
                            <div className="doble-field-container">
                                <Field
                                    type='text'
                                    name="folioSIO"
                                    className='add-expediente-doble-field suberie'
                                />
                            </div>
                        </div>
                        <div className='form-expediente-col'>
                            <div className={pori ? "doble-field-container pori select-pori" : "doble-field-container pori"}>
                                <label className="toggler-wrapper style-1">
                                    PORI
                                    <Field
                                        type="checkbox"
                                        name='check-pori'
                                        onClick={showPoriInput}
                                    />
                                    <div className="toggler-slider">
                                        <div className="toggler-knob"></div>
                                    </div>
                                </label>
                                {pori ? (
                                    <Field
                                        type='text'
                                        name="poriFolio"
                                        className='add-expediente-doble-field pori'
                                    />
                                ) : ''}
                            </div>
                        </div>
                    </div>
                ) : ''}

                <div className="form-row-container">
                    <div className="col-25">
                        <label className="add-expediente-field-label">Reclamante</label>
                    </div>
                    <div className="field-container">
                        <Field
                            type="text"
                            name="reclamante"
                            className='add-expediente-field'
                        >
                        </Field>
                    </div>
                </div>
                {institucionesFinancieras && serie != 30 ? (
                    <div className="form-row-container">
                        <div className="col-25">
                            <label className="add-expediente-field-label">Institución</label>
                        </div>
                        <div className="field-container">
                            <AutocompleteField
                                setInstitucionSeleccionada={setInstitucionSeleccionada}
                            />

                        </div>
                        {camposVacios ? (
                            <div className='campo-vacio-message-container'>
                                <p className='campo-vacio-message'>
                                    Es necesario seleccionar una institución financiera
                                </p>
                            </div>
                        ) : ''}
                    </div>
                ) : ''}
                <div className="form-row-container">
                    <div className="col-25">
                        <label className="add-expediente-field-label">Formato de soporte *</label>
                    </div>
                    <div className="field-container">
                        <Field
                            as="select"
                            name="formatoSoporte"
                            className='add-expediente-field'
                        >
                            <option value="">--Selecciona una opción--</option>
                            <option value='PAPEL'>PAPEL</option>
                            <option value='ELECTRONICO'>ELECTRÓNICO</option>
                            <option value='DIGITAL'>DIGITAL</option>
                            <option value='MIXTO'>MIXTO</option>
                        </Field>
                    </div>
                </div>
                <div className="form-row-container">
                    <div className="col-25">
                        <label className="add-expediente-field-label">Resumen del contenido</label>
                    </div>
                    <div className="field-container">
                        <Field
                            type="text"
                            name="resumenContenido"
                            className='add-expediente-field'
                        >
                        </Field>
                    </div>
                </div>
                <div className='add-expediente-btn-container'>
                    <button
                        className='cancel-add-expediente-btn'
                        type='button'
                        onClick={handleCancelar}
                    >
                        Cancelar
                    </button>
                    <button
                        className='add-expediente-btn'
                        type='submit'
                    >
                        Crear
                    </button>
                </div>
            </Form>
        </Formik >
    )
}

export default CrearExpedienteForm