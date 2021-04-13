import { createSlice } from "@reduxjs/toolkit";
import axios from "../../axios/axiosMain";
import { AppThunk, RootState } from "../store";
import { addMemberFetch } from "reduxState/teams/addMember";

interface Data {
    id: string
}

interface State {
  success: boolean;
  loading: boolean;
  error: any;
  data: Data | null;
}

const initialState: State = {
  loading: false,
  success: false,
  error: null,
  data: null,
};

export const findUser = createSlice({
  name: "findUser",
  initialState,
  reducers: {
    start: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
      state.data = null;
    },
    success: (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.data = action.payload;
    },
    failed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
      state.data = null;
    },
  },
});

export const { start, success, failed } = findUser.actions;

export const findUserFetch = (email: string, teamId: string): AppThunk => async (
  dispatch
) => {
  dispatch(start());
  axios
    .get(`/users/search/${email}`,  {
      headers: { "x-auth-token": localStorage.getItem("token") },
    })
    .then((res) => {
      dispatch(success(res.data));
      dispatch(addMemberFetch(teamId,{id: res.data._id, name: res.data.name}));
    })
    .catch((err) => {
      dispatch(failed(err));
    });
};

export const selectStart = (state: RootState) => state.findUser.loading;
export const selectSuccess = (state: RootState) => state.findUser.success;
export const selectError = (state: RootState) => state.findUser.error;

export default findUser.reducer;
