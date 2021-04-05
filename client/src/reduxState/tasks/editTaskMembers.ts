import { createSlice } from "@reduxjs/toolkit";

import { AppThunk, RootState } from "../store";

import axios from "axios/axiosMain";

interface State {
  loading: boolean;
  error: any;
  success: boolean;
}

interface Data {
  member: {
    id: string,
    name: string,
    role: string,
  },
  delete: boolean,
}

const initialState: State = {
  loading: false,
  error: null,
  success: false,
};

const editTaskMembers = createSlice({
  name: "editTaskMembers",
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

export const { start, success, failed } = editTaskMembers.actions;

export const editTaskMembersFetch = (
  teamId: string,
  projectId: string,
  taskId: string,
  data: Data,
): AppThunk =>  async (dispatch) => {
  dispatch(start());
   await axios.put(`/teams/${teamId}/projects/${projectId}/tasks/${taskId}/members`, data, {
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

export const selectLoading = (state: RootState) => state.editTaskMembers.loading;
export const selectError = (state: RootState) => state.editTaskMembers.error;
export const selectSuccess = (state: RootState) => state.editTaskMembers.success;

export default editTaskMembers.reducer;
