import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../axios/axiosMain";
import { AppThunk, RootState } from "./store";

interface Data {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}


interface Action {
  type: string;
  data?: Data;
  error?: any;
}

interface PostData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface createUserState {
  loading: boolean;
  error: any;
  success: boolean;
}

const initialState: createUserState = {
  loading: false,
  error: null,
  success: false,
};

export const createUserSlice = createSlice({
  name: "createUser",
  initialState,
  reducers: {
    create: (state) => {
      state.loading = true;
      state.error = null;
    },
    success: (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    failed: (state, action: PayloadAction<Action>) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
  },
});

export const { create, success, failed } = createUserSlice.actions;

export const createUser = (data: PostData): AppThunk => async (dispatch) => {
  dispatch(create());
  await axios
    .post("/users/create", data)
    .then((res) => {
      dispatch(success());
    })
    .catch((error) => {
      dispatch(failed(error));
    });
};

export const selectLoading = (state: RootState) => state.createUser.loading;
export const selectError = (state: RootState) => state.createUser.error;
export const selectSuccess = (state: RootState) => state.createUser.success;

export default createUserSlice.reducer;
