import React from 'react';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { useDispatch } from 'react-redux';
import { startCategoryDelete } from '../../actions/categorias';
import Swal from 'sweetalert2';
import { productsStartDelete } from '../../actions/productos';


export const ProductosTable = ({listadoMostrar}) => {
    const dispatch = useDispatch();

    // FUNCIÓN PARA ELIMINAR UNA CATEGORÍA
    const eliminarProducto = (id) => {
        Swal.fire({
            title: '¿Está seguro que desea borrar éste producto?',
            text: "Esta acción no se puede deshacer",
            showCancelButton: true,
            confirmButtonText: 'Borrar',
            cancelButtonText: `Cancelar`,
            cancelButtonColor: 'red'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch( productsStartDelete(id) )
            } 
        })
        
    }


  return (<>
  
        <table >
                <thead >
                    <tr>
                        <th></th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Categoría</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                {
                    listadoMostrar().map( product => (
                       
                        <tr key={product._id}>
                            <td>
                            <ReactTooltip place="top" type="dark" effect="solid"/> 
                                {
                                    product.category.name === "Sin categoría" 
                                    && 
                                    <i 
                                        className="fa-solid fa-triangle-exclamation text-warning"
                                        data-tip="Si el producto no tiene categoría, no se mostrará en las listas de la página principal."
                                    ></i>
                                }
                            </td>
                            <td data-titulo="Nombre">{product.name}</td>

                            <td data-titulo="Precio">
                                <span>{product.price ? "$" + product.price : "Sin asignar"}</span>
                            </td>

                            <td data-titulo="Cantidad" className="fs-6 ">
                                <span>{product.cantidad ? product.cantidad : "Sin asignar"}</span> 
                                <span className="text-lowercase"> { product.medida}</span>                            
                            </td>

                            <td data-titulo="Categoría">
                            
                                <span>{product.category.name}</span>
                            </td>

                            <td data-titulo="Estado">
                            <ReactTooltip place="top" type="dark" effect="solid"/>     
                                {
                                    !product.state 
                                    && 
                                    <i 
                                        className="fa-solid fa-triangle-exclamation text-danger me-1"
                                        data-tip="No se mostrará en el sitio principal"
                                    ></i>
                                }
                                <span>{product.state ? "Activo" : "Inactivo"}</span>
                            </td>
                            
                            <td >
                                
                                <Link className="btn btn-link" data-tip="Editar" to={`/admin/productos/${ product._id }`} >
                                    <i data-tip="Ver mas" className="fa-regular fa-eye mr-1"></i> 
                                    <span>Ver más</span>
                                </Link>

                                <Link className="btn btn-link m-1" data-tip="Editar" to={`/admin/productos/edit/${ product._id }`} >
                                    <i data-tip="Editar" className="fa-regular fa-pen-to-square mr-1"></i> 
                                    <span>Editar</span>
                                </Link>

                                <button 
                                    onClick={ () => eliminarProducto(product._id) } 
                                    className="btn btn-link mx-1" data-tip="Eliminar"
                                    >
                                        <i  className="fa-solid fa-trash-can"></i> 
                                        <span>Borrar</span>
                                </button>
                            </td>
                        </tr>
                    ) )
                }
                </tbody>
            </table>

             
  </>)
}
