import React from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { map } from 'lodash'
import routes from './routes';
import { Login } from '../pages/Login/Login';
import { BasicLayout } from '../layouts/BasicLayout';
import ProtectedRoute from './ProtectedRoute';
import SendEmailToRestorePassword from '../pages/SendEmailToRestorePassword/SendEmailToRestorePassword';
import ResetPassword from '../pages/ResetPassword/ResetPassword';

const Navigation = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<ProtectedRoute />}>
                    {map(routes, (route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <route.layout>
                                    <route.component />
                                </route.layout>
                            }
                        />
                    ))}
                </Route>
                <Route
                    path='login/'
                    layout={<BasicLayout />}
                    element={<Login />}
                />
                <Route
                    path='send-email-to-restore-password'
                    layout={<BasicLayout />}
                    element={<SendEmailToRestorePassword />}
                />
                <Route
                    path='reset-password/:moment/:token'
                    layout={<BasicLayout />}
                    element={<ResetPassword />}
                />
            </Routes>
        </BrowserRouter>
    )
}

export default Navigation