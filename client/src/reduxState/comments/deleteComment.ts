import {createSlice} from '@reduxjs/toolkit';

import {AppThunk, RootState} from '../store';

import axios from 'axios/axiosMain';

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

const commentsDelete = createSlice({
    name: "commentsDelete",
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
        }
    }
})

export const {start, success, failed} = commentsDelete.actions;

export const deleteCommentFetch = (teamId: string, projectId: string, taskId: string, commentId: string) : AppThunk =>  (dispatch) => {
    dispatch(start());
    axios.delete(`/teams/${teamId}/projects/${projectId}/tasks/${taskId}/comments/${commentId}`, {
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

export const selectLoading = (state:RootState)=> state.commentsDelete.loading;
export const selectSuccess = (state:RootState) => state.commentsDelete.success;
export const selectError = (state: RootState) => state.commentsDelete.error;

export default commentsDelete.reducer;