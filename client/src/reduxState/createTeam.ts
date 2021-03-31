import {createSlice} from '@reduxjs/toolkit';
import axios from '../axios/axiosMain';
import {AppThunk, RootState} from './store';

interface FormData {
    teamName: string,
    description?: string,
}

interface State {
    success: boolean;
    loading: boolean;
    error: any;
    teamId: string;
}

const initialState: State = {
    loading: false,
    success: false,
    error: null,
    teamId: '',
}

export const createTeamSlice = createSlice({
    name: "createTeam",
    initialState,
    reducers: {
        start: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
            state.teamId = '';
        },
        success: (state, action)=>{
            state.loading = false;
            state.error = null;
            state.success = true;
            state.teamId = action.payload;
        },
        failed: (state, action) => {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
            state.teamId = '';
        },
        clear: (state) => {
            state.loading = false;
            state.success = false;
            state.error = null;
            state.teamId = '';
        }
    }
})

export const {start, success, failed, clear} = createTeamSlice.actions;


export const createTeam = (data: FormData) : AppThunk => (dispatch) => {
    dispatch(start());
    axios.post('/teams', data, {
        headers: {
            'x-auth-token': localStorage.getItem('token')
        }
    })
    .then((res)=>{
        dispatch(success(res.data._id));
    })
    .catch((err)=>{
        dispatch(failed(err));
    })
}

export const selectStart = (state:RootState) => state.createTeamSlice.loading;
export const selectSuccess = (state:RootState) => state.createTeamSlice.success;
export const selectError = (state:RootState) => state.createTeamSlice.error;
export const selectTeamId = (state:RootState) => state.createTeamSlice.teamId;

export default createTeamSlice.reducer;