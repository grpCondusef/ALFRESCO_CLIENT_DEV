import { useEffect } from 'react'
import './App.css'
import Navigation from './routes/Navigation'
import { CONDUSEF_TOKEN, URL_API } from '../src/utils/constants'
import { useDispatch } from 'react-redux'
import { setAuth } from './reducers/authSlice/authSlice'

function App() {
  const authDispatch = useDispatch()
  const token = localStorage.getItem(CONDUSEF_TOKEN)
  const getUserData = async () => {

    if (token) {
      try {
        const url = `${URL_API}/users/user-info/`
        const params = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
        const response = await fetch(url, params)
        const resultado = await response.json()
        authDispatch(setAuth({
          username: resultado.username,
          first_name: resultado.first_name,
          last_name: resultado.last_name,
          area_id: resultado.area_id,
          area: resultado.area,
          idAreaSIO: resultado.idAreaSIO,
          tipo_cuenta: resultado.tipo_cuenta,
          crear_expedientes: resultado.crear_expedientes,
          eliminar_expedientes: resultado.eliminar_expedientes,
          subir_documentos: resultado.subir_documentos,
          consulta_completa: resultado.consulta_completa,
          migrar_expediente: resultado.migrar_expediente,
          carga_masiva: resultado.carga_masiva,
          areas_asociadas: resultado.areas_asociadas,
          eliminar_documentos: resultado.eliminar_documentos,
          dashboard_uau: resultado.dashboard_uau,
        }))
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <Navigation />
  )
}

export default App
