import React from 'react'
import '../CSS/Error404.css'
import { Link } from 'react-router-dom'

export const Error404 = () => {
  return (
    <div className='error404-container'>
      <div id="clouds">
        <div className="cloud x1"></div>
        <div className="cloud x1_5"></div>
        <div className="cloud x2"></div>
        <div className="cloud x3"></div>
        <div className="cloud x4"></div>
        <div className="cloud x5"></div>
      </div>
      <div className='c'>
        <p className='_404'>404</p>
        <p className='_1'>LA PÁGINA</p>
        <p className='_2'>NO EXISTE</p>
        <Link className='btn' to={'/'}>REGRESAR</Link>
      </div>
    </div>
  )
}