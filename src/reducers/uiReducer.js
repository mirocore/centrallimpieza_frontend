import { types } from "../types/types";


const initialState = {
    error: {
        state: false,
        msg: ""
    },
    navegador: false
};

export const uiReducer = ( state = initialState, action ) => {
    
    switch( action.type ){

        case types.uiSetError:
            return{
                ...state,
                error: {
                    state:true,
                    msg: action.payload
                }
            }

        case types.uiRemoveError:
            return{
                ...state,
                error: {
                    state:false,
                    msg: ""
                }
            }
            case types.uiSetNavegador:
                return{
                    ...state,
                    navegador: true
                }
    
            case types.uiRemoveNavegador:
                return{
                    ...state,
                    navegador: false
                }    
        default:
            return state;
    }

}