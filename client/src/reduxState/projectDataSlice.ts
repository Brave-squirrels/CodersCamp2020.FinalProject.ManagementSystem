import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppThunk, RootState } from "./store";
import * as types from "../utils/types";

import axios from "../axios/axiosMain";

const initialState: any = {
  project: {
    ...types.baseProjectSetup,
  },
};

/* let initialState: any = {}; */
const singleProjectData = createSlice({
  name: "projectData",
  initialState,
  reducers: {
    setProjectData(state, action: PayloadAction<types.ProjectData>) {
      state.project = action.payload;
    },
  },
});

export const { setProjectData } = singleProjectData.actions;

export const fetchProject = (
  teamId: string,
  projectId: string
): AppThunk => async (dispatch) => {
  await axios
    .get(`/teams/${teamId}/projects/${projectId}`, {
      headers: { "x-auth-token": localStorage.getItem("token") },
    })
    .then((res) => {
      dispatch(setProjectData(res.data));
    })
    .catch(() => console.log("err"));
};

export const selectProjectData = (state: RootState) =>
  state.singleProjectData.project;

export default singleProjectData.reducer;
