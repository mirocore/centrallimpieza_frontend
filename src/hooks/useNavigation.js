import { useState } from "react";

import {sortArray} from "../helpers/sortArray";

export const useNavigation = ( limite = 5, listado = [], ordenDefault = "reciente" ) => {

    const [paginaActual, setPaginaActual] = useState(0);
    const [paginaShow, setPaginaShow] = useState(1);
    const totalPaginas = Math.ceil(listado.length / limite);
    const [orden, setOrden] = useState(ordenDefault);
    const [busqueda, setBusqueda] = useState("");

    // Creo un array con números para utilizar en el navegador
    const arrayTotalPaginas = [];
    for( let i = 0; i < totalPaginas; i++ ){
        arrayTotalPaginas.push(i + 1)
    }

    // Ordena el array según el criterio seleccionado
    const arrayOrdenado = sortArray(listado, orden);

    const siguientePagina = () => {
        if( paginaShow <= totalPaginas ){
            setPaginaActual( paginaActual + limite )
            setPaginaShow( paginaShow + 1 )
        }
    }

    const anteriorPagina = () => {
        if(paginaActual > 0){
            setPaginaActual( paginaActual - limite )
            setPaginaShow( paginaShow - 1 )
        }
    }

    const cambiarOrden = ({target}) => {
        setOrden(target.value);
    }

    // Resultado de la búsqueda. Realiza un filtrado del listado ordenado.
    const listadoMostrar = () => {
        if(busqueda.length === 0){
            return arrayOrdenado.slice(paginaActual, paginaActual + limite)
        }

        const filtrado = arrayOrdenado.filter( item => item.name.toLowerCase().includes(busqueda.toLowerCase()) );
        return filtrado.slice(paginaActual, paginaActual + limite)
    }

    // Realizar busqueda
    const handleSearch = ( { target } ) => {
        setBusqueda( target.value );
        setPaginaActual(0);
        setPaginaShow(1);
    }
    
    // Dirigirse a la página indicada
    const navegarPagina = (pag) => {
        setPaginaActual( (pag - 1) * limite );
        setPaginaShow( pag );
    }


    return {
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
    }
} 