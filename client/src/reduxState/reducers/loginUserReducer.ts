import * as actionTypes from '../actions/types';

const initState = {
    loading: false,
    error: null,
    id: null,
    token: null,
    success: false
}

const loginReducer = (state = initState, action: any)=>{
    switch(action.type){
        case actionTypes.LOGIN_USER:
            return{
                ...state,
                loading: true,
                id: null,
                token: null,
                success: false
            }
        case actionTypes.LOGIN_SUCCESS:
            return{
                ...state,
                loading: false,
                error: null,
                id: action.id,
                token: action.token,
                success: true
            }
        case actionTypes.LOGIN_FAIL:
            return{
                ...state,
                loading: false,
                error: action.error,
                token: null,
                id: null,
                success: false
            }
        case actionTypes.LOGOUT:
            return{
                ...state,
                loading: false,
                error: null,
                token: null,
                id: null,
                success: false
            }
            default: return state
    }
}

export default loginReducer;