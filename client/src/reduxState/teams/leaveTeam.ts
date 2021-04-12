import {createSlice} from '@reduxjs/toolkit';
import axios from '../../axios/axiosMain';
import {AppThunk, RootState} from '../store'

interface State {
    success: boolean;
    loading: boolean;
    error: any;
}

const initialState: State = {
    loading: false,
    success: false,
    error: null,
}

export const leaveTeam = createSlice({
    name: 'leaveTeam',
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
        failed: (state,action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        },
        reset: (state)=>{
            state.loading = false;
            state.error = null;
            state.success = false;
        }
    }
})

export const {start,success,failed, reset} = leaveTeam.actions;

export const leaveTeamFetch = (teamId: string) : AppThunk => async (dispatch) => {
    dispatch(start());
    axios
      .put(`/teams/${teamId}/leaveTeam`, {}, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      })
      .then((res) => {
       dispatch(success());
       setTimeout(() => {
        dispatch(reset());
    }, 2000);
      })
      .catch((err) => {
        dispatch(failed(err));
      });
}

export const selectStart = (state:RootState) => state.leaveTeam.loading;
export const selectSuccess = (state:RootState) => state.leaveTeam.success;
export const selectError = (state:RootState) => state.leaveTeam.error;

export default leaveTeam.reducer;