import * as actionTypes from '../actions/types';

interface Data {
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}

interface Action {
    type: string,
    error?: Error,
    data?: Data
}

interface InitState {
    loading: boolean;
    error: null | Error;
    success: boolean;
}

const initState : InitState = {
    loading: false,
    error: null,
    success: false
}

const reducer = (state = initState, action:Action)=>{
    switch(action.type){
        case actionTypes.CREATE_USER: 
        return{
            ...state,
            loading: true
        }
        case actionTypes.CREATE_SUCCESS:
        return{
            ...state,
            loading: false,
            success: true
        };
        case actionTypes.CREATE_FAILED:
            return{
                ...state,
                loading: false,
                success: false,
                error: action.error
            }
        default: return state;
    }
}

export default reducer;