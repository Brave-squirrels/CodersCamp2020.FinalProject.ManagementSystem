import {createSlice} from '@reduxjs/toolkit';
import axios from '../axios/axiosMain';
import {AppThunk, RootState} from './store';

interface State{
    loading: boolean;
    error: any;
    information: string | null;
    success: boolean;
}

const initialState: State ={
    loading: false,
    error: null,
    information: null,
    success: false,
}

export const handleTeamInvite = createSlice({
    name: "handleTeamInvite",
    initialState,
    reducers: {
        start: (state) => {
            state.loading = true;
            state.error = null;
            state.information = null;
            state.success = false;
        },
        success: (state, action)=> {
            state.loading = false;
            state.error = null;
            state.information = action.payload;
            state.success = true;
        },
        failed: (state, action) => {
            state.loading = false;
            state.information = null;
            state.error = action.payload;
            state.success = false;
        }
    }
})

export const {start, success, failed} = handleTeamInvite.actions;
 
export const declineInvite = (id: string) : AppThunk => async (dispatch) => {
    dispatch(start());
    await axios.put(`/teams/${id}/removePending`, {
        headers: {
            'x-auth-token': localStorage.getItem('token')
        }
    })
    .then(res=>{
        dispatch(success('Declined'))
    })
    .catch(err=>{
        dispatch(failed(err));
    })
}

export const acceptInvite = (id: string) : AppThunk => async (dispatch) => {
    dispatch(start());
    await axios.put(`/teams/${id}/addUser`, {
        headers: {
            'x-auth-token': localStorage.getItem('token')
        }
    }) //id + token
    .then(res=>{
        dispatch(success('Accepted'))
    })
    .catch(err=>{
        dispatch(failed(err));
    })
}

export const selectLoading = (state:RootState) => state.handleTeamInvite.loading;
export const selectInformation = (state: RootState) => state.handleTeamInvite.information;
export const selectError = (state: RootState) => state.handleTeamInvite.error;
export const selectSuccess = (state:RootState) => state.handleTeamInvite.success;

export default handleTeamInvite.reducer;