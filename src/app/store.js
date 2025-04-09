

import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../reducers/authSlice/authSlice'
import errorMessageReducer from '../reducers/errorMessageSlice/errorMessageSlice'
import expedienteReducer from '../reducers/expedienteSlice.js/expedienteSlice'
import expedientesListReducer from '../reducers/expedientesListSlice/expedientesListSlice'
import loaderReducer from '../reducers/loaderSlice/loaderSlice'
import modalReducer from '../reducers/modalSlice/modalSlice'
import paginationReducer from '../reducers/paginationSlice/paginationSlice'
import searchReducer from '../reducers/searchSlice/searchSlice'

//------------------REDUCERS--------------------


export const store = configureStore({
  reducer: {
    auth: authSlice,
    modal: modalReducer,
    loader: loaderReducer,
    expedientes: expedientesListReducer,
    expedienteInfo: expedienteReducer,
    search: searchReducer,
    pagination: paginationReducer,
    errorMessage: errorMessageReducer
  },
})