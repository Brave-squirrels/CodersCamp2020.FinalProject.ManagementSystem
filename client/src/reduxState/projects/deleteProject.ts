import {createSlice} from '@reduxjs/toolkit';

import {AppThunk, RootState} from '../store';

import axios from '../../axios/axiosMain';

interface State {
    loading: boolean;
    error: any;
    success: boolean;
}

const initialState:State = {
    loading: false,
    error: null,
    success: false,
}

const deleteProject = createSlice({
    name: 'deleteProject',
    initialState,
    reducers: {
        start: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        success: (state) => {
            state.loading = false;
            state.error = null;
            state.success = true;
        },
        failed: (state,action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false; 
        },
        reset: (state)=>{
            state.loading = false;
            state.error = null;
            state.success = false;
        }
    }
})

export const {start,success,failed, reset} = deleteProject.actions;

export const deleteProjectFetch = (teamId:string, projectId:string) : AppThunk => async (dispatch) => {
    dispatch(start());
    await axios.delete(`/teams/${teamId}/projects/${projectId}`, {
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

export const selectLoading = (state:RootState)=> state.deleteProject.loading;
export const selectSuccess = (state:RootState) => state.deleteProject.success;
export const selectError = (state: RootState) => state.deleteProject.error;

export default deleteProject.reducer;