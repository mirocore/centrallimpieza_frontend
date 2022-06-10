import React from 'react'
import {  NavLink, Outlet } from 'react-router-dom'


export const DashboardRoutes = () => {
  return (<>

    <div className="row mt-5 mb-3 text-center">
        <div className="col">
            <h1>Panel de control</h1>
            <p className="text-secondary">Seleccione la colección que desea editar</p>
        </div>
    </div>

    <div className="row">
        <div className="col">
            <div className="d-flex mb-4">
                <NavLink to="/admin/productos" className="btn btn-outline-primary d-inline-block mr-1 rounded-0">Productos</NavLink>
                <NavLink to="/admin/categorias" className="btn btn-outline-primary d-inline-block mr-1 rounded-0">Categorias</NavLink>
            </div>
            <Outlet/>
        </div>
    </div>

  
    
    </>
  )
}
