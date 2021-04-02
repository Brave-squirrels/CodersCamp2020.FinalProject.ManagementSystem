import { createSlice } from "@reduxjs/toolkit";

import { AppThunk, RootState } from "../store";
import { TaskData, baseTaskSetup } from "utils/types";

import axios from "axios/axiosMain";

interface State {
  loading: boolean;
  error: any;
  success: boolean;
  tasks: TaskData[];
}

const initialState: State = {
  loading: false,
  error: null,
  success: false,
  tasks: [{ ...baseTaskSetup }],
};

const getTasks = createSlice({
  name: "getTasks",
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
      state.tasks = action.payload;
    },
    failed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
  },
});

export const { start, success, failed } = getTasks.actions;

export const fetchTasks = (teamId: string, projectId: string): AppThunk => async (
  dispatch
) => {
  dispatch(start());
  await axios
    .get(`/teams/${teamId}/projects/${projectId}/tasks`, {
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

export default getTasks.reducer;
