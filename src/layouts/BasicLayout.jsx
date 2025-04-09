import React from 'react'
import { Header } from '../components/Header'

export const BasicLayout = ({ children }) => {
    return (
        <div style={{paddingBottom: '2rem'}}>
            <Header />
            {children}
        </div>
    )
}