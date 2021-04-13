import {createSlice} from '@reduxjs/toolkit';

import {AppThunk, RootState} from '../store';

import axios from 'axios/axiosMain';

interface Data {
    name: string;
    content: string;
}

interface State {
    loading: boolean;
    error: any;
    success: boolean;
}

const initialState: State = {
    loading: false,
    error: null,
    success: false,
}

const changeNote = createSlice({
    name: "changeNote",
    initialState,
    reducers: {
        start: (state)=>{
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        success: (state,action)=>{
            state.loading = false;
            state.error = null 
            state.success = true;
        },
        failed: (state,action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        }
    }
})

export const {start, success, failed} = changeNote.actions;

export const changeNoteFetch = (teamId: string, projectId: string, noteId: string, data: Data) : AppThunk =>  (dispatch) => {
    dispatch(start());
    axios.put(`/teams/${teamId}/projects/${projectId}/notes/${noteId}`,data, {
        headers: {
            'x-auth-token': localStorage.getItem('token')
        }
    })
    .then(res=>{
        dispatch(success(res.data));
    })
    .catch(err=>{
        dispatch(failed(err));
    })
}

export const selectLoading = (state:RootState)=> state.changeNote.loading;
export const selectSuccess = (state:RootState) => state.changeNote.success;
export const selectError = (state: RootState) => state.changeNote.error;

export default changeNote.reducer;