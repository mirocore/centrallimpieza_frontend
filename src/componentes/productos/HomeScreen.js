import React, {useEffect } from 'react'

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { productsStartLoaded } from '../../actions/productos';
import { prepararArray } from '../../helpers/prepararArray';
import { Spinner } from '../ui/Spinner';


export const HomeScreen = () => {

  const dispatch = useDispatch();
  useEffect( () => {
    dispatch( productsStartLoaded() );
  }, [dispatch] )

  const { products } = useSelector( state => state.products );

  const listado = prepararArray( products );


  return (<>

      <div>
       {
          listado.length > 0 ? (<>

            {
              listado.map( tabla => (
                <div key={tabla.name} className="card mb-3">
                    <div className="card-body p-0">
                      <table className="tabla-main table-striped">
                        <thead>
                          <tr>
                            <th>{tabla.name}</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                            <th>Precio por unidad</th>
                          </tr>
                        </thead>
                        <tbody>
                        {
                          tabla.items.map( (producto, index) => (
                            <tr key={index}>

                              {
                                producto.state && 
                                (<>
                                  <td>{producto.name}</td>
                                  <td className="text-lowercase">{producto.cantidad} {producto.medida}</td>
                                  <td className="fw-bold">
                                    {producto.stock ? ( <>${producto.price}</> ) : (<>"Sin Stock"</>)}
                                    
                                  </td>
                                  <td>{producto.stock ? (  <>  ${(producto.price / producto.cantidad).toFixed(2)}  </>) : null}</td>
                                  </>)
                                }
                            </tr>
                              )
                            )
                        }
                        </tbody>
                      </table>
                    </div>
                </div>
               ))
            }

            </>): <Spinner />

       }
    </div>


    </>)
}
