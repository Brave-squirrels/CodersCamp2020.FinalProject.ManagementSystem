import axios from '../../axios/axiosMain';

import * as actionTypes from '../actions/types';

import { AppDispatch } from "reduxState/actions/types";

interface PostData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

const startRegister = ()=>{
    return{
        type: actionTypes.CREATE_USER
    }
}

const registerSuccess = ()=>{
    return {
        type: actionTypes.CREATE_SUCCESS
    }
}

const registerFailed = (error : Error) => {
    return{
        type: actionTypes.CREATE_FAILED,
        error: error
    }
}

export const createUser = (data: PostData) => {
    return (dispatch : AppDispatch)=>{
        dispatch(startRegister());
        axios.post('/users/create', data)
        .then(res=>{
            dispatch(registerSuccess());
        })
        .catch(error=>{
            dispatch(registerFailed(error));
        })
    }
}