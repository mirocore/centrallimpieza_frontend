import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import { types } from "../types/types";
import {toast} from 'react-hot-toast';
import { uiRemoveError, uiRemoveNavegador, uiSetError, uiSetNavegador } from "./ui";




export const categoryStartLoad = () => {
    return async(dispatch) =>{

        const rta = await fetchSinToken("api/categorias");
        const body = await rta.json();

        if( body.ok ){
            dispatch( categoryLoad(body.categorias) );
        }else{
            console.log(body.msg)
        }
    }
}

const categoryLoad = ( categories ) => ({
    type: types.categoryLoad,
    payload: categories
})


export const categoryStartAdd = (name) => {
    return async(dispatch) => {
        const data = {name}
        try {
            const rta = await fetchConToken("api/categorias", data, "POST");
            const body = await rta.json();
            
            if(body.ok){
                toast.success(body.msg ,{duration: 4000,});
                dispatch(categoryAdd(body.categoria));
                dispatch( uiRemoveError() );
                dispatch( uiSetNavegador() );
                dispatch( uiRemoveNavegador() );
            }else{
                console.log(body)
                dispatch( uiSetError( body.errors[0].msg ) )
            }
        } catch (error) {
            console.log(error)
        }
        
        
    }
}


const categoryAdd = (category) => ({
    type: types.categoryAdd,
    payload: category
})

export const startCategoryDelete = (id) => {
    return async(dispatch) => {
        try {
            const rta = await fetchConToken(`api/categorias/${id}`, undefined, "DELETE");
            const body = await rta.json();
            
            if(body.ok){
                toast.success(body.msg ,{duration: 4000,});
                console.log(body);
                dispatch(categoryDelete(id));
                dispatch( categoryStartLoad() );
                
            }else{
                console.log(body)
                toast.error(body.msg ,{duration: 4000,});
            }
        } catch (error) {
            toast.error(error ,{duration: 4000,});
        }
    }
}

const categoryDelete = (id) => ({
    type: types.categoryDelete,
    payload: id
})


export const categoryStartSetActive = (id) => {
    return async(dispatch) => {
        const rta = await fetchSinToken(`api/categorias/${id}`, undefined, "GET");
        const body = await rta.json();

        if(body.ok){
            dispatch( categorySetCategoryActive(body.categoria) );
        }else{
            console.log(body.msg);
            toast.error(body.msg ,{duration: 4000,});
        }

    }
}

const categorySetCategoryActive = (category) => ({
    type: types.categorySetCategoryActive,
    payload: category
})

const categoryCleanCategoryActive = () => ({
    type:types.categoryCleanCategoryActive
}) 


export const categoryStartUpload = (id, data) =>{
    return async(dispatch) => {
        const rta = await fetchConToken(`api/categorias/${id}`, data, "PUT");
        const body = await rta.json();
        
        if(body.ok){
            toast.success(body.msg ,{duration: 4000,});
            dispatch(categoryCleanCategoryActive());
            dispatch( uiRemoveError() );
            dispatch( uiSetNavegador() );
            dispatch( uiRemoveNavegador() );
        }else{
            console.log(body.msg);
            dispatch( uiSetError( body.msg ) )
        }
    }
}