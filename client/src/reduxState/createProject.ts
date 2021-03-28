import {createSlice} from '@reduxjs/toolkit';
import axios from '../axios/axiosMain';
import {AppThunk, RootState} from './store';

interface State {
    success: boolean;
    loading: boolean;
    error: any;
}

const initialState : State = {
    success: false,
    loading: false,
    error: null,
}

interface Data{
    projectName: string;
    deadline: Date;
    description?: string;
}

export const createProjectSlice = createSlice({
    name: 'createProject',
    initialState,
    reducers: {
        start: (state)=> {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        success: (state)=>{
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

export const {start, success, failed} = createProjectSlice.actions;

export const createProject = (teamId: string,data: Data) : AppThunk => (dispatch) => {
    dispatch(start());
    axios.post(`/teams/${teamId}`, data, {
        headers: {
            'x-auth-token': localStorage.getItem('token')
        }
    }).then(res=>{
        dispatch(success());
    })
    .catch(err=>{
        dispatch(failed(err));
    })
}

export const selectLoading = (state:RootState) => state.createProjectSlice.loading;

export const selectError = (state:RootState) => state.createProjectSlice.error;

export const selectSuccess = (state:RootState) => state.createProjectSlice.success;

export default createProjectSlice.reducer;