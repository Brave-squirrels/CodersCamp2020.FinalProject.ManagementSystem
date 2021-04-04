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

const commentEdit = createSlice({
    name: 'commentEdit',
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

export const {start, success, failed} = commentEdit.actions;

export const editCommentFetch = (teamId: string, projectId: string, taskId: string, commentId: string, data : Data) : AppThunk => async (dispatch) => {
    dispatch(start());
    await axios.put(`/teams/${teamId}/projects/${projectId}/tasks/${taskId}/comments/${commentId}`, data, {
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

export const selectLoading = (state:RootState)=> state.commentEdit.loading;
export const selectSuccess = (state:RootState) => state.commentEdit.success;
export const selectError = (state: RootState) => state.commentEdit.error;

export default commentEdit.reducer;
