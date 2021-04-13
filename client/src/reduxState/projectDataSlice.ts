import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppThunk, RootState } from "./store";
import * as types from "../utils/types";

import axios from "../axios/axiosMain";

interface State {
  project: types.ProjectData;
  loading: boolean;
  error: any;
}

const initialState: State = {
  project: {
    ...types.baseProjectSetup,
  },
  loading: false,
  error: null,
};

const singleProjectData = createSlice({
  name: "projectData",
  initialState,
  reducers: {
    start:  (state) =>{
      state.loading = true;
      state.error = null;
    },
    setProjectData: (state, action: PayloadAction<types.ProjectData>) => {
      state.project = action.payload;
      state.loading = false;
      state.error = false;
    },
    failed: (state,action) =>{
      state.loading = false;
      state.error = action.payload;
    }
  },
});

export const { setProjectData, start, failed } = singleProjectData.actions;

export const fetchProject = (
  teamId: string,
  projectId: string
): AppThunk => async (dispatch) => {
  dispatch(start())
  await axios
    .get(`/teams/${teamId}/projects/${projectId}`, {
      headers: { "x-auth-token": localStorage.getItem("token") },
    })
    .then((res) => {
      dispatch(setProjectData(res.data));
    })
    .catch((err) => dispatch(failed(err)));
};

export const selectProjectData = (state: RootState) =>
  state.singleProjectData.project;
export const selectLoading = (state:RootState) => state.singleProjectData.loading;
export const selectError = (state:RootState) => state.singleProjectData.error;

export default singleProjectData.reducer;
