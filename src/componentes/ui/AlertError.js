import React from 'react'

export const AlertError = ({msg}) => {
  return (
    <div className="alert alert-danger rounded-0 animate__animated animate__fadeIn">
        <i className="fa-solid fa-circle-xmark d-inline-block"></i>
        <span className="ms-2 d-inline-block">{msg}</span>  
    </div>
  )
}
