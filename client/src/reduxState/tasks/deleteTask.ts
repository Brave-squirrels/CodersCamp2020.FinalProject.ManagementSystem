import { createSlice } from "@reduxjs/toolkit";

import { AppThunk, RootState } from "../store";

import axios from "axios/axiosMain";

interface State {
  loading: boolean;
  error: any;
  success: boolean;
}

const initialState: State = {
  loading: false,
  error: null,
  success: false,
};

const deleteTask = createSlice({
  name: "deleteTask",
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

export const { start, success, failed } = deleteTask.actions;

export const deleteTaskFetch = (
  teamId: string,
  projectId: string,
  taskId: string
): AppThunk => async (dispatch) => {
  dispatch(start());
  await axios
    .delete(`/teams/${teamId}/projects/${projectId}/tasks/${taskId}`, {
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

export const selectLoading = (state: RootState) => state.deleteTask.loading;
export const selectError = (state: RootState) => state.deleteTask.error;
export const selectSuccess = (state: RootState) => state.deleteTask.success;

export default deleteTask.reducer;
