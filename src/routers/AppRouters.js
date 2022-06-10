import React, {useEffect} from 'react';
import { Toaster} from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { startChecking } from '../actions/auth';


import { LoginScreen } from '../componentes/auth/LoginScreen';
import { HomeScreen} from '../componentes/productos/HomeScreen';
import { Navbar } from '../componentes/ui/Navbar';
import { DashboardRoutes } from './DashboardRoutes';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

import { CategoriasScreen } from '../componentes/categorias/CategoriasScreen'
import { ProductosScreen } from '../componentes/productos/ProductosScreen';
import { CategoriasFormulario } from '../componentes/categorias/CategoriasFormulario';
import { CategoriaEdit } from '../componentes/categorias/CategoriaEdit';
import { ProductosFormCreate } from '../componentes/productos/ProductoFormCreate';
import { ProductosFormEdit } from '../componentes/productos/ProductoFormEdit';
import { ProductosShow } from '../componentes/productos/ProductosShow';

export const AppRouters = () => {

  const dispatch = useDispatch();
  const { checking } = useSelector( state => state.auth );

  useEffect(() => {
    dispatch( startChecking() );
  }, [dispatch])
  
  if(checking){
    return <h1>Espere...</h1>
  }

  return (
    <BrowserRouter>
        <Navbar />
        <div className="container my-5 pb-5">

          <Routes>

              <Route path="/" element={ 
                  <HomeScreen />
                } />

              <Route path="/login" element={ 
                <PublicRoute>
                  <LoginScreen/> 
                </PublicRoute>
              } />

              <Route path="/admin/*" element={ 
                <PrivateRoute>
                  <DashboardRoutes/> 
                </PrivateRoute>
                }>
                  <Route path="categorias" element={<CategoriasScreen/>} />
                  <Route path="categorias/create" element={<CategoriasFormulario/>} />
                  <Route path="categorias/edit/:id" element={<CategoriaEdit/>} />
                  <Route path="productos" element={<ProductosScreen/>} />
                  <Route path="productos/create" element={<ProductosFormCreate />} />
                  <Route path="productos/edit/:id" element={<ProductosFormEdit/>} />
                  <Route path="productos/:id" element={<ProductosShow/>} />
              </Route>


          </Routes>
        </div>
        <footer className="bg-footer py-3 fixed-bottom">
              <div className="container">
                <div className="row">
                  <div className="col">
                    <p className="text-center text-white m-0">Diseñado y programado por Ramiro Belcore</p>
                  </div>
                </div>
              </div>
        </footer>
        <Toaster/>
    </BrowserRouter>

  )
}
