import { combineReducers } from "redux";

import { authReducer } from "./authReducer";
import { categoryReducer } from "./categoryReducer";
import { productsReducer } from "./productsReducer";
import { uiReducer } from "./uiReducer";

export const rootReducers = combineReducers({
    auth: authReducer,
    category: categoryReducer,
    products : productsReducer,
    ui: uiReducer
})