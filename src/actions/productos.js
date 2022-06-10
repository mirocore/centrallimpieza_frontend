import toast from "react-hot-toast";
import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import { types } from "../types/types";
import { uiRemoveError, uiRemoveNavegador, uiSetError, uiSetNavegador } from "./ui";


export const productsStartLoaded = () => {
    return async(dispatch) => {
        const rta = await fetchSinToken("api/productos");
        const body = await rta.json();

        if( body.ok ){
            dispatch( productsLoad( body.productos ) )
        }else{
            console.log(body.msg);
            toast.error(body.msg)
        }
    }
}


const productsLoad = (products) => ({
    type: types.productsLoad,
    payload: products
})


export const productsStartAdd = ( data ) => {
    return async(dispatch) => {


        const rta = await fetchConToken("api/productos", data,"POST");
        const body = await rta.json();

        if(body.errors){
            dispatch(uiSetError(body.errors[0].msg));
            return;
        }

        if( body.ok ){
            console.log(body);
            dispatch(uiRemoveError());
            toast.success(body.msg);
            dispatch( productsAdd(body.producto) );
            dispatch( uiSetNavegador() );
            dispatch( uiRemoveNavegador() );
        }else{
            console.log(body.msg)
            toast.error(body.msg);
        }


    }
}

const productsAdd = ( data ) => ({
    type: types.productAdd,
    payload: data,
})


export const productsStartDelete = (id) => {
    return async(dispatch) => {

        const rta = await fetchConToken(`api/productos/${id}`, undefined, "DELETE");
        const body = await rta.json();

        if(body.errors){
            dispatch(uiSetError(body.errors[0].msg));
            return;
        }

        if(body.ok){
            console.log(body.ok)
            toast.success(body.msg);
            dispatch(productsDeleteProduct(id));
            dispatch( productsStartLoaded() );
        }else{
            console.log(body.msg)
            toast.error(body.msg);
        }
    }
}

const productsDeleteProduct = (id) => ({
    type: types.productDelete,
    payload: id,
})






export const productStartSetActive = (id) => {
    return async(dispatch) => {
        const rta = await fetchSinToken(`api/productos/${id}`, undefined, "GET");
        const body = await rta.json();

        if(body.ok){
            dispatch( productsSetProductActive(body.producto) );
        }else{
            console.log(body.msg);
            toast.error(body.msg ,{duration: 4000,});
        }

    }
}

const productsSetProductActive = (product) => ({
    type: types.productsSetProductActive,
    payload: product
})

const productsCleanProductActive = () => ({
    type:types.productsCleanProductActive
}) 


export const productsStartUpload = (id, data) =>{
    return async(dispatch) => {
        const rta = await fetchConToken(`api/productos/${id}`, data, "PUT");
        const body = await rta.json();
        
        if(body.errors){
            dispatch(uiSetError(body.errors[0].msg));
            return;
        }

        if(body.ok){
            toast.success(body.msg ,{duration: 4000,});
            dispatch( productUpload(body.producto) );
            dispatch( uiRemoveError() );
            dispatch( uiSetNavegador() );
            dispatch( uiRemoveNavegador() );
            dispatch( productsCleanProductActive() );
        }else{
            console.log(body.msg);
            dispatch( uiSetError( body.msg ) )
        }
    }
}

const productUpload = (data) => ({
    type: types.productUpload,
    payload: data,
})