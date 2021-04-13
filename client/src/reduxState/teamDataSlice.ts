import {  createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppThunk, RootState } from "./store";
import * as types from "../utils/types";

import axios from 'axios/axiosMain';

interface State {
  team: types.TeamData;
  loading: boolean;
  error: any;
}

const initialState: State = {
  team: {
    ...types.baseTeamSetup
  },
  loading: false,
  error: null,
};

const singleTeamData = createSlice({
  name: "teamData",
  initialState,
  reducers: {
    start: (state) => {
      state.loading = true;
      state.error = null;
    },
    setTeamData: (state, action: PayloadAction<types.TeamData>) => {
      state.team = action.payload;
      state.loading = false ;
      state.error = null;
    },
    failed: (state, action)=> {
      state.loading = false;
      state.error = action.payload;
    }
  },
});

export const { setTeamData, start, failed } = singleTeamData.actions;

export const fetchTeam = (id: string): AppThunk =>  async (dispatch) =>{
  dispatch(start());
  await axios
      .get(`/teams/${id}`, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      })
      .then((res) => {
        dispatch(setTeamData(res.data));
      })
      .catch((err) => dispatch(failed(err.response.data)));
}

export const selectTeamData = (state:RootState) => state.singleTeamData.team;
export const selectLoading = (state:RootState) => state.singleTeamData.loading;
export const selectError = (state:RootState) => state.singleTeamData.error;

export default singleTeamData.reducer;
