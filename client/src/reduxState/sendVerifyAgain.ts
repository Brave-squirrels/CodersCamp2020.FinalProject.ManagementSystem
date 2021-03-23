import { createSlice } from "@reduxjs/toolkit";
import axios from '../axios/axiosMain';
import { AppThunk, RootState } from "./store";

interface State {
    loading: boolean;
    error: any;
}

const initialState : State = {
    loading: false,
    error: null
}

interface Data {
    email: string
}

export const sendVerifyAgain = createSlice({
    name: "sendVerifyAgain",
    initialState,
    reducers: {
        start: (state) =>{
            state.loading = true;
            state.error = null;
        },
        success: (state)=>{
            state.loading = false;
            state.error = null;
        },
        fail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const {start, success, fail} = sendVerifyAgain.actions;

export const sendEmailAgain = (data: Data): AppThunk => (dispatch)=>{
    dispatch(start());
    axios.post('/users/email',data)
    .then(res=>{
        dispatch(success());
    })
    .catch(err=>{
        dispatch(fail(err));
    })
}

export const selectLoading = (state:RootState) => state.sendVerifyAgain.loading;
export const selectError = (state:RootState) => state.sendVerifyAgain.error;

export default sendVerifyAgain.reducer;