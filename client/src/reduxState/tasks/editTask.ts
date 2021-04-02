import { createSlice } from "@reduxjs/toolkit";

import { AppThunk, RootState } from "../store";

import axios from "axios/axiosMain";

interface State {
  loading: boolean;
  error: any;
  success: boolean;
}

interface Data {
    name?: string;
    content?:string;
    deadlineDate?: Date;
    status?: string;
}

const initialState: State = {
  loading: false,
  error: null,
  success: false,
};

const editTask = createSlice({
  name: "editTask",
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

export const { start, success, failed } = editTask.actions;

export const editTaskFetch = (
  teamId: string,
  projectId: string,
  taskId: string,
  data: Data
): AppThunk => async (dispatch) => {
  dispatch(start());
  await axios
    .put(`/teams/${teamId}/projects/${projectId}/tasks/${taskId}`, data, {
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

export const selectLoading = (state: RootState) => state.editTask.loading;
export const selectError = (state: RootState) => state.editTask.error;
export const selectSuccess = (state: RootState) => state.editTask.success;

export default editTask.reducer;
