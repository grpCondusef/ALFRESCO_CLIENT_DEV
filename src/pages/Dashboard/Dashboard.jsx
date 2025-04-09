import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CONDUSEF_TOKEN, URL_API } from '../../utils/constants'
import { Header } from '../../components/Header'
import { ColumnGraph } from './Components/ColumnGraph';
import { GraphTable } from './Components/GraphTable'
import { PieGraph } from './Components/PieGraph'
import { MiniLoader } from './Components/MiniLoader'
import { EstatusByExpedienteTable } from './Components/EstatusByExpedienteTable'
import { BarChart } from './Components/BarChart'
import { EmpyExpedientesByUAU } from './Components/EmpyExpedientesByUAU'
import './CSS/Dashboard.css'

export const Dashboard = () => {

  const token = localStorage.getItem(CONDUSEF_TOKEN)
  const navigate = useNavigate()
  const [showElement, setShowElement] = useState(false)
  const [lazyElements, setLazyElements] = useState(10)
  const [estatusByExpedientes, setEstatusByExpedientes] = useState([])
  const [percentageOfDigitizedDocumentsPieData, setPercentageOfDigitizedDocumentsPieData] = useState([])
  const [percentageOfDigitizedDocumentsByUAUData, setPercentageOfDigitizedDocumentsByUAUData] = useState([])
  const [percentageOfDigitizedDocumentsByMonth, setPercentageOfDigitizedDocumentsByMonth] = useState([])
  const [deletedDocuments, setDeletedDocuments] = useState([])
  const [expedientesWithoutDocuments, setExpedientesWithoutDocuments] = useState([])
  const [uloadedPDFs, setUploadedPDFs] = useState([])
  const [createdExpedientes, setCreatedExpedientes] = useState([])
  const [deletedExpedientes, setDeletedExpedientes] = useState([])

  const goToEmptyExpedientes = (area_id) => {
    const url = `/expediente/empty-expedientes/${area_id}`;
    window.open(url, '_blank');
  }

  const getExpedienteEstatus = async () => {
    try {
      const url = `${URL_API}/dashboard/get-each-file-with-their-number-of-loaded-pages/`
      const respuesta = await fetch(url, {
        method: 'GET',
        headers: {
          "Content-type": "application/json",
          'Authorization': `Bearer ${token}`
        }
      }) //NO PONEMOS EL MÉTODO PORQUE "fetch" POR DEFECTO YA TRAE EL MÉTODO "GET"
      const resultado = await respuesta.json() //CREAMOS UN "JSON" QUE CONTENGA LOS DATOS DEL CLIENTE SELECCIONADO
      const { expedientesData } = resultado
      setShowElement(true)
      setEstatusByExpedientes(expedientesData)

    } catch (error) {
      console.log(error)
    }
  }


  const getPercentageOfDigitizedDocumentsPie = async () => {
    try {
      const url = `${URL_API}/dashboard/percentage-digitizacion-documents-pie/`
      const respuesta = await fetch(url, {
        method: 'GET',
        headers: {
          "Content-type": "application/json",
          'Authorization': `Bearer ${token}`
        }
      })
      const resultado = await respuesta.json()
      setPercentageOfDigitizedDocumentsPieData(resultado)
    } catch (error) {
      console.log(error)
    }
  }


  const getPercentageOfDigitizedDocumentsByUAU = async () => {
    try {
      const url = `${URL_API}/dashboard/get-percentage-of-digitized-documents-by-uau/`
      const respuesta = await fetch(url, {
        method: 'GET',
        headers: {
          "Content-type": "application/json",
          'Authorization': `Bearer ${token}`
        }
      })
      const resultado = await respuesta.json()
      const { digitalizacion_data } = resultado
      setPercentageOfDigitizedDocumentsByUAUData(digitalizacion_data)
    } catch (error) {
      console.log(error)
    }
  }


  const getPercentageOfDigitizedDocumentsByMonth = async () => {
    try {
      const url = `${URL_API}/dashboard/get-percentage-of-digitized-documents-by-month/`
      const respuesta = await fetch(url, {
        method: 'GET',
        headers: {
          "Content-type": "application/json",
          'Authorization': `Bearer ${token}`
        }
      })
      const resultado = await respuesta.json()
      const { empty_expedientes_by_month } = resultado
      setPercentageOfDigitizedDocumentsByMonth(empty_expedientes_by_month)
    } catch (error) {
      console.log(error)
    }
  }


  const getdeletedDocuments = async () => {
    try {
      const url = `${URL_API}/dashboard/get-deleted-documents/`
      const respuesta = await fetch(url, {
        method: 'GET',
        headers: {
          "Content-type": "application/json",
          'Authorization': `Bearer ${token}`
        }
      })
      const resultado = await respuesta.json()
      const { deleted_documents } = resultado
      setDeletedDocuments(deleted_documents)
    } catch (error) {
      console.log(error)
    }
  }

  const getUploadedPDFs = async () => {
    try {
      const url = `${URL_API}/dashboard/get-uploaded-pdfs/`
      const respuesta = await fetch(url, {
        method: 'GET',
        headers: {
          "Content-type": "application/json",
          'Authorization': `Bearer ${token}`
        }
      })

      const resultado = await respuesta.json()
      const { uploadedpdfs } = resultado
      setUploadedPDFs(uploadedpdfs)
    } catch (error) {
      console.log(error)
    }
  }

  const getExpedientesWithoutDocuments = async () => {
    try {
      const url = `${URL_API}/dashboard/get-expedientes-without-documents-by-area/`
      const respuesta = await fetch(url, {
        method: 'GET',
        headers: {
          "Content-type": "application/json",
          'Authorization': `Bearer ${token}`
        }
      })
      const resultado = await respuesta.json()
      const { expedientes_data } = resultado
      setExpedientesWithoutDocuments(expedientes_data)
    } catch (error) {
      console.log(error)
    }
  }

  const getCreatedExpedientes = async () => {
    try {
      const url = `${URL_API}/dashboard/get-created-expedientes/`
      const respuesta = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
      const resultado = await respuesta.json()
      const { created_expedientes } = resultado
      setCreatedExpedientes(created_expedientes)
    } catch (error) {
      console.log(error)
    }
  }

  const getDeletedExpedientes = async () => {
    try {
      const url = `${URL_API}/dashboard/get-deleted-expedientes/`
      const respuesta = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
      const resultado = await respuesta.json()
      const { deleted_expedientes } = resultado
      setDeletedExpedientes(deleted_expedientes)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getExpedienteEstatus()
    getPercentageOfDigitizedDocumentsPie()
    getPercentageOfDigitizedDocumentsByUAU()
    getPercentageOfDigitizedDocumentsByMonth()
    getdeletedDocuments()
    getUploadedPDFs()
    getExpedientesWithoutDocuments()
    getCreatedExpedientes()
    getDeletedExpedientes()
  }, [])


  const percentageOfDigitizedDocumentsByUAUDataArray = percentageOfDigitizedDocumentsByUAUData.map((item) => [item.area, item.digitalizado, item.no_digitalizado]);
  const percentageOfDigitizedDocumentsByMonthArray = percentageOfDigitizedDocumentsByMonth.map((item) => [item.month, item.count]);


  return (
    <div className='dashboard-container'>

      <div className='dashboard-row'>

        {deletedDocuments.length ?
          <EmpyExpedientesByUAU
            tableData={expedientesWithoutDocuments}
            goToEmptyExpedientes={goToEmptyExpedientes}
          />
          : <MiniLoader />}

        <PieGraph
          pieData={percentageOfDigitizedDocumentsPieData}
        />
      </div>


      <div className='dashboard-row'>
        {percentageOfDigitizedDocumentsByMonth.length > 0 ? <ColumnGraph
          graphTitle={'Expedientes sin documentos cargados por mes'}
          titleFontSize={18}
          columnsGraph={["Estatus", "Expedientes vacíos"]}
          graphData={percentageOfDigitizedDocumentsByMonthArray}
          graphColors={["#e9a668"]}
          isStacked={true}
          grapWidth={'55rem'}
          graphHeight={"30rem"}
          ylabel={'# de expedientes'}
          xlabel={'Mes'}
        /> : <MiniLoader />}
        {estatusByExpedientes.length > 1 ?
          <GraphTable
            dataTable={estatusByExpedientes}
            downloadData={true}
            tableHeight={'30rem'}
          />
          : <MiniLoader />}
      </div>


      <div className='dashboard-row'>
        {deletedDocuments.length ?
          <BarChart
            barChartTitle={'Documentos eliminados por unidad'}
            titleFontSize={19}
            barChartData={deletedDocuments}
            barChartColors={'#E57373'}
          />
          : <MiniLoader />}
        <BarChart
          barChartTitle={'Pdf´s cargados por unidad'}
          titleFontSize={19}
          barChartData={uloadedPDFs}
          barChartColors={'#69ab85'}
        />
      </div>

      <div className='dashboard-row'>
        {percentageOfDigitizedDocumentsByUAUData.length > 0 ? <ColumnGraph
          graphTitle={'Porcentaje de expedientes vacíos vs expedientes con documentos'}
          titleFontSize={19}
          columnsGraph={["Estatus", "Con Documentos", "Vacíos"]}
          graphData={percentageOfDigitizedDocumentsByUAUDataArray}
          graphColors={["#167de4", "#c34e4e"]}
          isStacked={true}
          grapWidth={'87rem'}
          graphHeight={"30rem"}
          ylabel={'% de expedientes'}
          xlabel={'UAU'}
        /> : <MiniLoader />}
      </div>

      <div className='dashboard-row'>
        {deletedDocuments.length ?
          <BarChart
            barChartTitle={'Expedientes creados por unidad'}
            titleFontSize={19}
            barChartData={createdExpedientes}
            barChartColors={'#87a8c2'}
          />
          : <MiniLoader />}
        <BarChart
          barChartTitle={'Expedientes eliminados por unidad'}
          titleFontSize={19}
          barChartData={deletedExpedientes}
          barChartColors={'#daa035'}
        />
      </div>

    </div>
  )
}
