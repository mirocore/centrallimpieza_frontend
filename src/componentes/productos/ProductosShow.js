import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { productStartSetActive } from '../../actions/productos';
import { Spinner } from '../ui/Spinner';

export const ProductosShow = () => {

    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
      if( id ){
        dispatch( productStartSetActive(id) )
      }

    }, [dispatch])
    
    const { productActive } = useSelector( state => state.products );
    //const { name, price, stock, state, category, cantidad } = productActive;

  return (
    <>

        <div className="row">
            <div className="col">
                <Link to="/admin/productos" >Volver al listado</Link>
            </div>
        </div>

{
  productActive ? (

  

        <div className="row mt-5">
          <div className="col">
            <div className="card">

              <div className="card-header fondo-azul-principal"> 
                <p className="card-title text-white m-0">Datos del producto</p> 
              </div>

              <div className="card-body px-0">
              <h2 className="card-title fs-2 fw-bold texto-azul-principal px-3">{productActive.name}</h2>
              <hr />




              <div className="row px-3">
                <div className="col-12 col-sm-4">
                    <p className="fs-6 mb-0"><span className="text-muted fw-bold">Precio: </span> <span className="">${productActive.price}</span> </p>    
                </div>
                <div className="col-12 col-sm-4">
                    <p className="fs-6 mb-0"><span className="text-muted fw-bold">Cantidad: </span> <span className="">{productActive.cantidad}</span>  <span className="text-lowercase"> { productActive.medida}</span> </p>    
                </div>
                <div className="col-12 col-sm-4">
                    <p className="fs-6 mb-0"><span className="text-muted fw-bold">Precio por unidad: </span> <span className="">${(productActive.price / productActive.cantidad).toFixed(2)}</span> </p>    
                </div>
              </div>

              <hr />

              <div className="row px-3">
                <div className="col-12 col-sm-4">
                    <p className="fs-6 mb-0"><span className="text-muted fw-bold">Stock: </span> <span className="">{productActive.stock ? "Producto en Stock" : "Sin Stock"}</span> </p>    
                </div>
                <div className="col-12 col-sm-4">
                    <p className="fs-6 mb-0"><span className="text-muted fw-bold">Estado: </span> <span className="">{productActive.state ? "Publicado" : "No publicado"}</span> </p>    
                </div>
                <div className="col-12 col-sm-4">
                    <p className="fs-6 mb-0"><span className="text-muted fw-bold">Categoría: </span> <span className="">{ productActive.category ? productActive.category.name : "Sin categoría" }</span></p>    
                </div>
              </div>


              
                
              </div>

            </div>
          </div>
        </div>


) : (<Spinner />)
}



    </>
  )
}
