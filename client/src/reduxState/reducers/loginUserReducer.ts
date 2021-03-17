import * as actionTypes from '../actions/types';

interface Action {
    type: string,
    id?: string,
    token?:string,
    error?:Error,
}

const initState = {
    loading: false,
    error: null,
    id: null,
    token: null,
    success: false,
    isAuth: false,
}

const loginReducer = (state = initState, action: Action)=>{
    switch(action.type){
        case actionTypes.LOGIN_USER:
            return{
                ...state,
                loading: true,
                id: null,
                token: null,
                success: false,
                isAuth: false,
            }
        case actionTypes.LOGIN_SUCCESS:
            return{
                ...state,
                loading: false,
                error: null,
                id: action.id,
                token: action.token,
                success: true,
                isAuth: true,
            }
        case actionTypes.LOGIN_FAIL:
            return{
                ...state,
                loading: false,
                error: action.error,
                token: null,
                id: null,
                success: false,
                isAuth: false,
            }
        case actionTypes.LOGOUT:
            return{
                ...state,
                loading: false,
                error: null,
                token: null,
                id: null,
                success: false,
                isAuth: false,
            }
            default: return state
    }
}

export default loginReducer;