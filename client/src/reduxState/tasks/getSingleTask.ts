import { createSlice } from "@reduxjs/toolkit";

import { AppThunk, RootState } from "../store";
import { TaskData, baseTaskSetup } from "utils/types";

import axios from "axios/axiosMain";

interface State {
  loading: boolean;
  error: any;
  success: boolean;
  task: TaskData;
}

const initialState: State = {
  loading: false,
  error: null,
  success: false,
  task: { ...baseTaskSetup },
};

const getTask = createSlice({
  name: "getTask",
  initialState,
  reducers: {
    start: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    success: (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.task = action.payload;
    },
    failed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
  },
});

export const { start, success, failed } = getTask.actions;

export const fetchTask = (teamId: string, projectId: string, taskId: string): AppThunk =>  async (
  dispatch
) => {
  dispatch(start());
  await axios
    .get(`/teams/${teamId}/projects/${projectId}/tasks/${taskId}`, {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    })
    .then((res) => {
      dispatch(success(res.data));
    })
    .catch((err) => {
      dispatch(failed(err));
    });
};

export const selectLoading = (state: RootState) => state.getTasks.loading;
export const selectError = (state: RootState) => state.getTasks.error;
export const selectSuccess = (state: RootState) => state.getTasks.success;
export const selectTasks = (state: RootState) => state.getTasks.tasks;

export default getTask.reducer;
