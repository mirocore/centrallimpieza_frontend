import React,{useEffect} from 'react';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { productsStartLoaded } from '../../actions/productos';
import { prepararArray } from '../../helpers/prepararArray';
import { Spinner } from '../ui/Spinner';


export const VistaWeb = () => {


    const dispatch = useDispatch();
    useEffect( () => {
      dispatch( productsStartLoaded() );
    }, [dispatch] )
  
    const { products } = useSelector( state => state.products );
  
    const listado = prepararArray( products );

    return(<>
    
    </>)
}