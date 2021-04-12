import {createSlice} from '@reduxjs/toolkit';

import {AppThunk, RootState} from '../store';

import axios from '../../axios/axiosMain';

interface State {
    loading: boolean;
    error: any;
    success: boolean;
}

const initialState : State = {
    loading: false,
    error: null,
    success: false,
}

const deleteNote = createSlice({
    name: 'deleteNote',
    initialState,
    reducers: {
        start: (state)=> {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        success: (state)=> {
            state.loading = false;
            state.error = null;
            state.success = true;
        },
        failed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        }
    }
})

export const {start, success, failed} = deleteNote.actions;

export const deleteNoteFetch = (teamId: string, projectId: string, noteId: string) : AppThunk => (dispatch) => {
    dispatch(start());
    axios.delete(`/teams/${teamId}/projects/${projectId}/notes/${noteId}`, {
        headers: {
            'x-auth-token': localStorage.getItem('token')
        }
    })
    .then(res=> {
        dispatch(success());
    })
    .catch(err=> {
        dispatch(failed(err));
        console.log(err.response);
    })
}

export const selectLoading = (state:RootState) => state.deleteNote.loading;
export const selectError = (state:RootState) => state.deleteNote.error;
export const selectSuccess = (state:RootState) => state.deleteNote.success;

export default deleteNote.reducer;