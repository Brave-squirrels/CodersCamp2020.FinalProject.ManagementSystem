import {createSlice} from '@reduxjs/toolkit';

import {AppThunk, RootState} from '../store';
import * as types from 'utils/types';

import axios from 'axios/axiosMain';

interface State {
    loading: boolean;
    error: any;
    comments: types.CommentData[];
}

const initialState: State = {
    loading: false,
    error: null,
    comments: [
        {
            ...types.baseCommentSetup
        }
    ],
}

const commentsData = createSlice({
    name: "commentsData",
    initialState,
    reducers: {
        start: (state)=>{
            state.loading = true;
            state.error = null;
        },
        success: (state,action)=>{
            state.loading = false;
            state.error = null 
            state.comments = action.payload;
        },
        failed: (state,action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const {start, success, failed} = commentsData.actions;

export const fetchComments = (teamId: string, projectId: string, taskId: string) : AppThunk =>  (dispatch) => {
    dispatch(start());
    axios.get(`/teams/${teamId}/projects/${projectId}/tasks/${taskId}/comments`, {
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

export const selectLoading = (state:RootState)=> state.commentsData.loading;
export const selectNotes = (state:RootState) => state.commentsData.comments;
export const selectError = (state: RootState) => state.commentsData.error;

export default commentsData.reducer;