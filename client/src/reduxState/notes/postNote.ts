import {createSlice} from '@reduxjs/toolkit';

import {AppThunk, RootState} from '../store';

import axios from 'axios/axiosMain';

interface Data {
    name: string,
    content: string,
}

const initialState: any = {
    loading: false,
    error: null,
    success: false,
}

const notesCreate = createSlice({
    name: "notesCreate",
    initialState,
    reducers: {
        start: (state)=>{
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        success: (state)=>{
            state.loading = false;
            state.error = null;
            state.success = true;
        },
        failed: (state,action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        },
        reset: (state)=> {
            state.loading = false;
            state.error = null;
            state.success = false;
        }
    }
})

export const {start, success, failed, reset} = notesCreate.actions;

export const createNote = (teamId: string, projectId: string, data: Data) : AppThunk =>  (dispatch) => {
    dispatch(start());
    axios.post(`/teams/${teamId}/projects/${projectId}/notes`,data, {
        headers: {
            'x-auth-token': localStorage.getItem('token')
        }
    })
    .then(res=>{
        dispatch(success());

    })
    .catch(err=>{
        dispatch(failed(err));
    })
}

export const selectLoading = (state:RootState)=> state.notesCreate.loading;
export const selectSuccess = (state:RootState) => state.notesCreate.success;
export const selectError = (state: RootState) => state.notesCreate.error;

export default notesCreate.reducer;