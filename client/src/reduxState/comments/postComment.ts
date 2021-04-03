import {createSlice} from '@reduxjs/toolkit';

import {AppThunk, RootState} from '../store';

import axios from 'axios/axiosMain';

interface State {
    loading: boolean;
    error: any;
    success: boolean;
}

interface Data {
    content: string;
}

const initialState : State = {
    loading: false,
    error: null,
    success: false,
}

const commentCreate = createSlice({
    name: 'commentCreate',
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
        failed: (state, action)=> {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        }
    }
})

export const {start, success, failed} = commentCreate.actions;

export const createCommentFetch = (teamId: string, projectId: string, taskId: string, data : Data) : AppThunk => async (dispatch) => {
    dispatch(start());
    await axios.post(`/teams/${teamId}/projects/${projectId}/tasks/${taskId}/comments`, data, {
        headers: {
            'x-auth-token': localStorage.getItem('token')
        }
    } )
    .then(res=>{
        dispatch(success());
    })
    .catch(err=>{
        dispatch(failed(err));
    })
}

export const selectLoading = (state:RootState)=> state.commentCreate.loading;
export const selectSuccess = (state:RootState) => state.commentCreate.success;
export const selectError = (state: RootState) => state.commentCreate.error;

export default commentCreate.reducer;
