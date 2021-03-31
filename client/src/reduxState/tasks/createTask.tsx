import { createSlice } from "@reduxjs/toolkit";

import { AppThunk, RootState } from "../store";

import axios from "axios/axiosMain";

interface State {
  loading: boolean;
  error: any;
  success: boolean;
}

interface Data {
  name: string;
  content: string;
  deadlineDate: string;
}

const initialState: State = {
  loading: false,
  error: null,
  success: false,
};

const createTask = createSlice({
  name: "createTask",
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
    failed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
  },
});

export const { start, success, failed } = createTask.actions;

export const createTaskFetch = (
  teamId: string,
  projectId: string,
  data: Data
): AppThunk => (dispatch) => {
  dispatch(start());
  axios
    .post(`/teams/${teamId}/projects/${projectId}/tasks`, data, {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    })
    .then((res) => {
      dispatch(success());
    })
    .catch((err) => {
      dispatch(failed(err));
    });
};

export const selectLoading = (state: RootState) => state.createTask.loading;
export const selectError = (state: RootState) => state.createTask.error;
export const selectSuccess = (state: RootState) => state.createTask.success;

export default createTask.reducer;
