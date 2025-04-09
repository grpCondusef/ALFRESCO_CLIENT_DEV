import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import jwt_decode from 'jwt-decode'
import { CONDUSEF_TOKEN } from '../utils/constants'

const ProtectedRoute = () => {

    const { username } = useSelector(state => state.auth);
    const token = localStorage.getItem(CONDUSEF_TOKEN);

    if (!token) {
        return <Navigate to={'login/'} />;
    }

    const decodedToken = jwt_decode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
        localStorage.removeItem(CONDUSEF_TOKEN);
        return <Navigate to={'login/'} />;
    }

    return <Outlet />;

}

export default ProtectedRoute

