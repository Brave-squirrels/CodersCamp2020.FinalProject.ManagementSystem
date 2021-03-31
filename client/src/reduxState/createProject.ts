import {createSlice} from '@reduxjs/toolkit';
import axios from '../axios/axiosMain';
import {AppThunk, RootState} from './store';

interface State {
    success: boolean;
    loading: boolean;
    error: any;
    projectId: string;
    teamId: string;
}

const initialState : State = {
    success: false,
    loading: false,
    error: null,
    projectId: '', 
    teamId: '',
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
        success: (state, action)=>{
            state.loading = false;
            state.error = null;
            state.success = true;
            state.projectId = action.payload.prjId;
            state.teamId = action.payload.teamId;
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
    axios.post(`/teams/${teamId}/projects`, data, {
        headers: {
            'x-auth-token': localStorage.getItem('token')
        }
    }).then(res=>{
        dispatch(success({prjId: res.data._id, teamId:  res.data.team.id}));
    })
    .catch(err=>{
        dispatch(failed(err));
    })
}

export const selectLoading = (state:RootState) => state.createProjectSlice.loading;

export const selectError = (state:RootState) => state.createProjectSlice.error;

export const selectSuccess = (state:RootState) => state.createProjectSlice.success;

export const selectProjectId = (state: RootState) => state.createProjectSlice.projectId;

export const selectTeamId = (state: RootState) => state.createProjectSlice.teamId;

export default createProjectSlice.reducer;