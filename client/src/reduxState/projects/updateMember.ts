import {createSlice} from '@reduxjs/toolkit';

import {AppThunk, RootState} from '../store';

import axios from '../../axios/axiosMain';

interface Data {
    member: {
        id: string,
        name: string,
        role: string
    },
    delete?: boolean
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

const updateMemberInProject = createSlice({
    name: "updateMemberInProject",
    initialState,
    reducers: {
        start: (state)=>{
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        success: (state)=>{
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

export const {start, success, failed} = updateMemberInProject.actions;

export const updateMemberInProjectFetch = (teamId: string, projectId: string, data: Data) : AppThunk =>  async (dispatch) => {
    dispatch(start());
    await axios.put(`/teams/${teamId}/projects/${projectId}/members`,data, {
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

export const selectLoading = (state:RootState)=> state.updateMemberInProject.loading;
export const selectSuccess = (state:RootState) => state.updateMemberInProject.success;
export const selectError = (state: RootState) => state.updateMemberInProject.error;

export default updateMemberInProject.reducer;