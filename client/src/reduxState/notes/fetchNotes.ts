import {createSlice} from '@reduxjs/toolkit';

import {AppThunk, RootState} from '../store';

import axios from 'axios/axiosMain';

const initialState: any = {
    loading: false,
    error: null,
    notes: {}
}

const notesData = createSlice({
    name: "notesData",
    initialState,
    reducers: {
        start: (state)=>{
            state.loading = true;
            state.error = null;
        },
        success: (state,action)=>{
            state.loading = false;
            state.error = null 
            state.notes = action.payload;
        },
        failed: (state,action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const {start, success, failed} = notesData.actions;

export const fetchNotes = (teamId: string, projectId: string) : AppThunk =>  (dispatch) => {
    dispatch(start());
    axios.get(`/teams/${teamId}/projects/${projectId}/notes`, {
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

export const selectLoading = (state:RootState)=> state.notesData.loading;
export const selectSuccess = (state:RootState) => state.notesData.notes;
export const selectError = (state: RootState) => state.notesData.error;

export default notesData.reducer;