import {createSlice} from '@reduxjs/toolkit';
import axios from '../axios/axiosMain';
import {AppThunk, RootState} from './store';

interface State{
    loading: boolean;
    error: any;
    information: string | null;
    success: boolean;
    teamId: string;
}

const initialState: State ={
    loading: false,
    error: null,
    information: null,
    success: false,
    teamId: '',
}

export const handleTeamInvite = createSlice({
    name: "handleTeamInvite",
    initialState,
    reducers: {
        start: (state, action) => {
            state.loading = true;
            state.error = null;
            state.information = null;
            state.success = false;
            state.teamId = action.payload;
        },
        success: (state, action)=> {
            state.loading = false;
            state.error = null;
            state.information = action.payload.information;
            state.success = true;
            state.teamId = action.payload.teamId;
        },
        failed: (state, action) => {
            state.loading = false;
            state.information = null;
            state.error = action.payload;
            state.success = false;
            state.teamId = '';
        }
    }
})

export const {start, success, failed} = handleTeamInvite.actions;
 
export const declineInvite = (teamId: string) : AppThunk => async (dispatch) => {
    dispatch(start(teamId));
    await axios.put(`/teams/${teamId}/rejectInvitation`, {},  {
        headers: { "x-auth-token": localStorage.getItem("token") },
      })
    .then(res=>{
        dispatch(success({information: 'Declined', teamId: teamId}))
    })
    .catch(err=>{
        dispatch(failed(err));
    })
}

export const acceptInvite = (teamId: string) : AppThunk => async (dispatch) => {
    dispatch(start(teamId));
    await axios.put(`/teams/${teamId}/addUser`,{}, {
        headers: {
            'x-auth-token': localStorage.getItem('token')
        }
    })
    .then(res=>{
        dispatch(success({information: 'Accepted', teamId: teamId}));
    })
    .catch(err=>{
        dispatch(failed(err));
    })
}

export const selectLoading = (state:RootState) => state.handleTeamInvite.loading;
export const selectInformation = (state: RootState) => state.handleTeamInvite.information;
export const selectError = (state: RootState) => state.handleTeamInvite.error;
export const selectSuccess = (state:RootState) => state.handleTeamInvite.success;
export const selectTeamId = (state:RootState) => state.handleTeamInvite.teamId;

export default handleTeamInvite.reducer;