import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { categoryStartLoad } from '../../actions/categorias';
import { productsStartLoaded } from '../../actions/productos';
import { useNavigation } from '../../hooks/useNavigation';
import { CategoriasTable } from '../categorias/CategoriasTable';
import { ProductosTable } from './ProductosTable';


export const ProductosScreen = () => {
  
  const dispatch = useDispatch();
    
  // Cargo las categorias
  useEffect(() => {
      dispatch( productsStartLoaded() )
  }, [dispatch])
  
  // Obtengo las categorias
  const { products } = useSelector( state => state.products );
  

  const {
    busqueda,
    limite,
    paginaShow,
    totalPaginas,
    paginaActual,
    arrayTotalPaginas,
    listadoMostrar,

    handleSearch,
    cambiarOrden,
    anteriorPagina,
    siguientePagina,
    navegarPagina,
  } = useNavigation(9, products);
  
  
  return (<>
  
    <div className="container">
      <div className="row">
        <div className="col">

            <div className="card bg-white shadow">



              {/* HEADER */}
              <div className="bg-white card-header py-3 d-flex justify-content-between align-items-center flex-wrap ">
                  <div>
                      <h2 className="mt-2 mt-sm-0 card-title h4 m-0 texto-azul-principal d-inline-block" id="titulo-card">Lista de Productos</h2>
                      <input 
                          type="text" 
                          name="buscar" 
                          id="buscarCate" 
                          autoComplete="off" 
                          placeholder="Buscar..." 
                          className="mt-2 mt-sm-0"
                          onChange={ handleSearch }
                          value={ busqueda }
                          />
                  </div>
                  <div>
                      <select className="me-3 mt-2 mt-sm-0" name="orden" id="orden" onChange={cambiarOrden}>
                          <option value="reciente">Más Reciente</option>
                          <option value="antiguo">Más Antiguo</option>
                          <option value="name-az">Nombre: A-Z</option>
                          <option value="name-za">Nombre: Z-A</option>
                          <option value="cate-az">Categoría: A-Z</option>
                          <option value="cate-za">Categoría: Z-A</option>
                          <option value="cant-ma">Cantidad: Mayor a menor</option>
                          <option value="cant-me">Cantidad: Menor a mayor</option>
                          <option value="prec-ma">Precio: Mayor a menor</option>
                          <option value="prec-me">Precio: Menor a mayor</option>
                      </select>
                      <Link to="/admin/productos/create" className="btn btn-success mt-2 mt-sm-0">Nuevo</Link>
                  </div>
              </div>

            {/* BODY */}
            <div className="card-body p-0">
                <ProductosTable 
                    listadoMostrar={listadoMostrar}
                />

                {
                    products.length === 0 && <div className="alert alert-danger rounded-0 text-center">No se ha creado ningún producto</div>
                }
            </div>


            {/* FOOTER */}
            {
                products.length > limite && (

                
              <div className="card-footer d-flex justify-content-end align-items-center">
                  <div>
                      <nav>
                      <ul className="pagination align-items-center">


                          <li className="page-item">
                              <p className="m-0 d-inline-block mx-2 m-0">Página { paginaShow } de {totalPaginas}</p>
                          </li>

                          {
                              paginaActual > 0 
                              &&
                              (
                                  <li className="page-item">
                                      <a onClick={anteriorPagina} className="page-link" href="#titulo-card"><i className="fa-solid fa-angles-left"></i></a>
                                  </li>
                              )
                          }
                          
                          
                          {
                              arrayTotalPaginas.map( pagina => (
                                  <li key={pagina} className={`page-item ${ parseInt(pagina) === parseInt(paginaShow) && "active" }`}>
                                      <a onClick={() => navegarPagina(pagina)} className="page-link" href="#titulo-card">
                                          {pagina}
                                      </a>
                                  </li>
                              ) )
                          }



                          {
                              paginaShow !== totalPaginas 
                              &&
                              (
                                  <li className="page-item">
                                      <a onClick={siguientePagina} className="page-link" href="#titulo-card"><i className="fa-solid fa-angles-right"></i></a>
                                  </li>
                              )
                          }

                          
                      </ul>
                      </nav>
                  </div>
              </div>
              ) 
              } {/* FINAL FOOTER */}




            </div>{/* FINAL CARD */}

            <div className="row mt-5">
                <div className="col">
                    <h2 className="h4 fw-bold">Aclaraciones:</h2>
                    <ul className="text-muted fst-italic">
                        <li>Los productos sin categoría no se mostrarán en la página principal, pero si pueden aparecer en el buscador.</li>
                        <li>Los productos en estado "inactivo" no podrán ser vistos en ningún lado del sitio</li>
                        <li>Los productos sin precio se verán como "Sin asignar"</li>
                        <li>Si el producto no se vende por unidad se mostrará tanto el precio publicado como el precio por unidad.</li>
                        <li>Los productos sin stock figurarán en el sitio pero no se mostrarán sus precios.</li>
                    </ul>
                </div>
            </div> 


        </div>{/* FINAL COL  */}
      </div>{/* FINAL ROW */}
    </div>{/* FINAL CONTAINER */}
  
  
  </>)
}
