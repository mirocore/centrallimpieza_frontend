import { types } from "../types/types";


export const uiSetError = (msg) => ({
    type: types.uiSetError,
    payload: msg
})

export const uiRemoveError = () => ({
    type: types.uiRemoveError
})

export const uiSetNavegador = (msg) => ({
    type: types.uiSetNavegador
})

export const uiRemoveNavegador = () => ({
    type: types.uiRemoveNavegador
})