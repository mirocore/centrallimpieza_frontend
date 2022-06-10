import {toast} from 'react-hot-toast';

import {fetchConToken, fetchSinToken} from "../helpers/fetch";
import { types } from '../types/types';

export const authStartLogin = (email, password) => {
    return async(dispatch) => {
        const data = {email, password};  
        const toastLoading = toast.loading('Ingresando...')
        const rta = await fetchSinToken( "api/auth/login", data, "POST" );
        const rdoLogin = await rta.json();
        

        if(rdoLogin.ok){
            localStorage.setItem("token", rdoLogin.token);
            localStorage.setItem("token-init-date", new Date().getTime());
            toast.dismiss(toastLoading);
            toast.success(`Bienvenido ${ rdoLogin.usuario.name }`);
            dispatch( login({uid: rdoLogin.usuario.uid, name: rdoLogin.usuario.name}) )
        }else{
            toast.dismiss(toastLoading);
            toast.error(rdoLogin.msg);
        }
    }
}


const login = (data) => ({
    type: types.authLogin,
    payload: data
})


export const startChecking = () => {
    return async(dispatch) => {
        
        const rta = await fetchConToken("api/auth/renew");
        const body = await rta.json();

        if(body.ok){
            console.log("Token revalidado");
            localStorage.setItem("token", body.token);
            localStorage.setItem("token-init-date", new Date().getTime());
            dispatch( login({
                uid: body.uid,
                name: body.name
            }) )
        }else{
            dispatch(finishChecking())
        }
    }
}

const finishChecking = () => ({
    type: types.authCheckingFinish
})


export const startLogout = () => {
    return async(dispatch) => {
        localStorage.removeItem("token");
        localStorage.removeItem("token-init-date");

        dispatch( logout() );
    }
}

const logout = () => ({
    type: types.authLogout
})