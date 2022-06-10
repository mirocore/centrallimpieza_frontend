import { types } from "../types/types"

const initialState = {
    categories: []
};

export const categoryReducer = ( state = initialState, action ) => {
    switch(action.type){

        case types.categoryLoad:
            return{
                ...initialState,
                categories: action.payload
            }
        case types.categoryAdd:
            return{
                ...state,
                categories: [
                    action.payload,
                    ...state.categories,
                ]
            };
        case types.categoryDelete:
            return{
                ...state,
                categories: state.categories.filter( categoria => categoria.id !== action.payload )
            };
        case types.categorySetCategoryActive:
            return{
                ...state,
                categoryActive: action.payload
            };
        case types.categoryCleanCategoryActive:
            return{
                ...state,
                categoryActive:null
            }
        default:
            return state
    }
}