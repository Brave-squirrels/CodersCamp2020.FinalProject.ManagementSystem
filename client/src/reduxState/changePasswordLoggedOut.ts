import { createSlice } from "@reduxjs/toolkit";
import axios from '../axios/axiosMain';
import { AppThunk, RootState } from "./store";

interface State {
    loading: boolean;
    success: boolean;
    error: any;
}

const initialState : State = {
    loading: false,
    success: false,
    error: null
}

interface Data {
    password: string;
    confirmPassword: string;
}

export const changePassword = createSlice({
    name: "changePassword",
    initialState,
    reducers: {
        start: (state) =>{
            state.success = false;
            state.loading = true;
            state.error = null;
        },
        success: (state)=>{
            state.success = true;
            state.loading = false;
            state.error = null;
        },
        fail: (state, action) => {
            state.success = false;
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const {start, success, fail} = changePassword.actions;

export const changePasswordLanding = (data: Data, token: string): AppThunk => (dispatch)=>{
    dispatch(start());
    axios.put('/users/password', data, {
        headers: {
            'x-auth-token': `${token}`,
        }
    })
    .then(res=>{
        dispatch(success());
    })
    .catch(err=>{
        dispatch(fail(err));
    })
}

export const selectLoading = (state:RootState) => state.changePasswordLanding.loading;
export const selectError = (state:RootState) => state.changePasswordLanding.error;
export const selectSuccess = (state:RootState) => state.changePasswordLanding.success;

export default changePassword.reducer;
