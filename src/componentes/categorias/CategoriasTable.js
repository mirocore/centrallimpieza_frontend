import React from 'react';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { useDispatch } from 'react-redux';
import { startCategoryDelete } from '../../actions/categorias';
import Swal from 'sweetalert2';


export const CategoriasTable = ({listadoMostrar}) => {

    const dispatch = useDispatch();

    // FUNCIÓN PARA ELIMINAR UNA CATEGORÍA
    const eliminarCategoria = (id) => {
        Swal.fire({
            title: '¿Está seguro que desea borrar ésta categoría?',
            text: "Esta acción no tiene vuelta atrás",
            showCancelButton: true,
            confirmButtonText: 'Borrar',
            cancelButtonText: `Cancelar`,
            cancelButtonColor: 'red'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch( startCategoryDelete(id) )
            } 
        })
        
    }


  return (<>
        <table >
                <thead >
                    <tr>
                        <th></th>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                {
                    listadoMostrar().map( category => (
                        <tr key={category._id}>
                            <td></td>
                            <td data-titulo="Nombre">{category.name}</td>
                            <td >
                                <ReactTooltip place="top" type="dark" effect="solid"/> 

                                <Link className="btn btn-link mx-1" data-tip="Editar" to={`/admin/categorias/edit/${ category._id }`} >
                                    <i data-tip="Editar" className="fa-regular fa-pen-to-square mr-1"></i> 
                                    <span>Editar</span>
                                </Link>

                                <button 
                                    onClick={ () => eliminarCategoria(category._id) } 
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
