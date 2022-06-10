import { types } from "../types/types";


const initialState = {
    products: [],
    productActive: null
}

export const productsReducer = ( state = initialState, action ) => {
    switch( action.type ){

        case types.productsLoad:
            return{
                ...state,
                products: action.payload
            }

        case types.productAdd:
            console.log(action.payload)
            return{
                ...state,
                products: [
                    ...state.products,
                    action.payload,
                ]
            }

        case types.productDelete:
            return {
                ...state,
                products: state.products.filter( product => product._id !== action.payload )
            };

        case types.productsSetProductActive:
            return{
                ...state,
                productActive: action.payload
            };
        case types.productsCleanProductActive:
            return{
                ...state,
                productActive:null
            }
        case types.productUpload:
            return{
                ...state,
                products: state.products.map( product => product._id === action.payload._id ? action.payload : product )
            }
        default: 
            return state;
    }
}