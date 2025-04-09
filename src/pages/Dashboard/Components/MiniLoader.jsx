import React from 'react'
import '../CSS/MiniLoader.css'

export const MiniLoader = () => {
  return (
    <div className='mini-loader-container'>
            <div className="three-body">
                <div className="three-body__dot"></div>
                <div className="three-body__dot"></div>
                <div className="three-body__dot"></div>
            </div>
        </div>
  )
}
