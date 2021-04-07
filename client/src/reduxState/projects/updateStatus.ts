import {createSlice} from '@reduxjs/toolkit';

import {AppThunk, RootState} from '../store';

import axios from '../../axios/axiosMain';

interface Data {
    status: string
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

const updateProjectStatus = createSlice({
    name: "updateProjectStatus",
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

export const {start, success, failed} = updateProjectStatus.actions;

export const updateProjectStatusFetch = (teamId: string, projectId: string, data: Data) : AppThunk =>  (dispatch) => {
    dispatch(start());
    axios.put(`/teams/${teamId}/projects/${projectId}/status`,data, {
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

export const selectLoading = (state:RootState)=> state.updateProjectStatus.loading;
export const selectSuccess = (state:RootState) => state.updateProjectStatus.success;
export const selectError = (state: RootState) => state.updateProjectStatus.error;

export default updateProjectStatus.reducer;