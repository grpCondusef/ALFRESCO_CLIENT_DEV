import React from 'react'
import { useSelector } from 'react-redux'
import { Loader } from '../../components/Loader'
import { LoginForm } from './Components/LoginForm'

export const Login = () => {

  const { showLoader } = useSelector(state => state.loader) //CONSUMIMOS EL STATE A TRAVÉS DE REDUX

  return (
    <div>
      {showLoader ? <Loader /> : ''}
      <LoginForm />
    </div>
  )
}
