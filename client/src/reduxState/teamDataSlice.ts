import {  createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppThunk, RootState } from "./store";
import * as types from "../utils/types";

import axios from 'axios/axiosMain';

const initialState: any = {
  team: {
    ...types.baseTeamSetup
  }
};

/* let initialState: any = {}; */
const singleTeamData = createSlice({
  name: "teamData",
  initialState,
  reducers: {
    setTeamData(state, action: PayloadAction<types.TeamData>) {
      state.team = action.payload;
    },
  },
});

export const { setTeamData } = singleTeamData.actions;

export const fetchTeam = (id: string): AppThunk =>  async (dispatch) =>{
  await axios
      .get(`/teams/${id}`, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      })
      .then((res) => {
        dispatch(setTeamData(res.data));
      })
      .catch(() => console.log("err"));
}

export const selectTeamData = (state:RootState) => state.singleTeamData.team;

export default singleTeamData.reducer;
