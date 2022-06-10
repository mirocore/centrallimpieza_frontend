import React, { useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { categoryStartLoad} from '../../actions/categorias';


import { useNavigation } from '../../hooks/useNavigation';
import { CategoriasTable } from './CategoriasTable';


export const CategoriasScreen = () => {

    const dispatch = useDispatch();
    
    // Cargo las categorias
    useEffect(() => {
        dispatch( categoryStartLoad() )
    }, [dispatch])
    
    // Obtengo las categorias
    const { categories } = useSelector( state => state.category );
    
    // Use Navigator
    const {
        limite, 
        paginaActual, 
        paginaShow,
        totalPaginas,
        arrayTotalPaginas,
        busqueda,

        siguientePagina,
        anteriorPagina,
        cambiarOrden,
        listadoMostrar,
        handleSearch,
        navegarPagina
    } = useNavigation(9, categories, "reciente");


    

    
  return (<>

<div className="container">
    <div className="row">
        <div className="col">



    <div className="card bg-white shadow">



        {/* HEADER */}
        <div className="bg-white card-header py-3 d-flex justify-content-between align-items-center flex-wrap ">
            <div>
                <h2 className="mt-2 mt-sm-0 card-title h4 m-0 texto-azul-principal d-inline-block" id="titulo-card">Lista de Categorías</h2>
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
                    <option value="medi-az">Medida: A-Z</option>
                    <option value="medi-za">Medida: Z-A</option>
                </select>
                <Link to="/admin/categorias/create" className="btn btn-success mt-2 mt-sm-0">Nuevo</Link>
            </div>
        </div>





        {/* BODY */}
        <div className="card-body p-0">
            <CategoriasTable 
                listadoMostrar={listadoMostrar}
            />

            {
                categories.length === 0 && <div className="alert alert-danger rounded-0 text-center">No se ha creado ninguna categoría</div>
            }
        </div>


        {/* FOOTER */}
        {
            categories.length > limite && (

           
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


        </div>
    </div>
</div>


    </>
  )
}
