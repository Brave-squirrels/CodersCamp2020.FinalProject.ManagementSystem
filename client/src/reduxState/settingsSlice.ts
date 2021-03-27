import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../axios/axiosMain";
import { AppThunk, RootState } from "./store";

interface nameData {
  name: string;
}

interface passwordData {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

interface InitState {
  name: string;
  activeName: boolean;
  btnName: string;
  oldPassword: string;
  newPassword: string;
  confirm: string;
  error: string;
  success: boolean;
}

const initialState: InitState = {
  name: "",
  activeName: true,
  btnName: "EDIT",
  oldPassword: "",
  newPassword: "",
  confirm: "",
  error: "",
  success: false,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    toggleActiveName: (state) => {
      state.activeName = !state.activeName;
    },
    toggleBtnName: (state) => {
      state.btnName = state.activeName ? "EDIT" : "SAVE";
    },
    setOldPassword: (state, action: PayloadAction<string>) => {
      state.oldPassword = action.payload;
    },
    setNewPassword: (state, action: PayloadAction<string>) => {
      state.newPassword = action.payload;
    },
    setConfirm: (state, action: PayloadAction<string>) => {
      state.confirm = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    resetPassword: (state) => {
      state.oldPassword = "";
      state.newPassword = "";
      state.confirm = "";
    },
    toggleSuccess: (state, action: PayloadAction<boolean>) => {
      state.success = action.payload;
    },
  },
});

export const {
  setName,
  toggleActiveName,
  toggleBtnName,
  setOldPassword,
  setNewPassword,
  setConfirm,
  setError,
  resetPassword,
  toggleSuccess,
} = settingsSlice.actions;

export const changeName = (data: nameData): AppThunk => async () => {
  const token = localStorage.getItem("token");
  try {
    await axios.put("/users/name", data, {
      headers: { "x-auth-token": `${token}` },
    });
  } catch (e) {
    console.log("Error", e.response.data);
  }
};

export const changePassword = (data: passwordData): AppThunk => async (
  dispatch
) => {
  const token = localStorage.getItem("token");
  try {
    await axios.put("/users/changepassword", data, {
      headers: { "x-auth-token": `${token}` },
    });
    dispatch(setError(""));
    dispatch(resetPassword());
    dispatch(toggleSuccess(true));
  } catch (e) {
    dispatch(setError(e.response.data));
    dispatch(toggleSuccess(false));
  }
};

export const deleteUser = (data: string): AppThunk => async (dispatch) => {
  try {
    await axios.delete(`/users/${data}`);
  } catch (e) {
    console.log(e.response.data);
  }
};

export const selectName = (state: RootState) => state.settings.name;
export const selectActiveName = (state: RootState) => state.settings.activeName;
export const selectBtnName = (state: RootState) => state.settings.btnName;
export const selectOldPassword = (state: RootState) =>
  state.settings.oldPassword;
export const selectNewPassword = (state: RootState) =>
  state.settings.newPassword;
export const selectConfirm = (state: RootState) => state.settings.confirm;
export const selectError = (state: RootState) => state.settings.error;
export const selectSuccess = (state: RootState) => state.settings.success;

export default settingsSlice.reducer;
