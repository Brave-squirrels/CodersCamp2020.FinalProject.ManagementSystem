import {createSlice} from '@reduxjs/toolkit';
import axios from '../../axios/axiosMain';
import {AppThunk, RootState} from '../store'

interface Data {
    newTeamName: string;
}

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

export const changeTeamTitle= createSlice({
    name: 'changeTeamTitle',
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
        }
    }
})

export const {start,success,failed} = changeTeamTitle.actions;

export const changeTitle = (teamId: string,data: Data) : AppThunk => async (dispatch) => {
    dispatch(start());
    axios
      .put(`/teams/${teamId}/changeTeamName`, data, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      })
      .then((res) => {
       dispatch(success());
      })
      .catch((err) => {
        dispatch(failed(err));
      });
}

export const selectStart = (state:RootState) => state.changeTeamTitle.loading;
export const selectSuccess = (state:RootState) => state.changeTeamTitle.success;
export const selectError = (state:RootState) => state.changeTeamTitle.error;

export default changeTeamTitle.reducer;