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
    email: string
}

export const sendForgotPassword = createSlice({
    name: "sendForgotPassword",
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

export const {start, success, fail} = sendForgotPassword.actions;

export const sendChangePassword = (data: Data): AppThunk => (dispatch)=>{
    dispatch(start());
    axios.post('/users/sendreset',data)
    .then(res=>{
        dispatch(success());
    })
    .catch(err=>{
        dispatch(fail(err));
    })
}

export const selectLoading = (state:RootState) => state.sendForgotPassword.loading;
export const selectError = (state:RootState) => state.sendForgotPassword.error;
export const selectSuccess = (state:RootState) => state.sendForgotPassword.success;

export default sendForgotPassword.reducer;