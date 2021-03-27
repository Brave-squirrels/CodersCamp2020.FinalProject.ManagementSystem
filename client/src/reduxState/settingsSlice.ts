import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../axios/axiosMain";
import { AppThunk, RootState } from "./store";

interface PayloadPassword {
  oldPassword?: string;
  newPassword?: string;
  confirm?: string;
}

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
}

const initialState: InitState = {
  name: "",
  activeName: true,
  btnName: "EDIT",
  oldPassword: "",
  newPassword: "",
  confirm: "",
  error: "",
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
    setPasswordData: (state, action: PayloadAction<PayloadPassword>) => {
      if (action.payload.oldPassword)
        state.oldPassword = action.payload.oldPassword;
      if (action.payload.newPassword)
        state.newPassword = action.payload.newPassword;
      if (action.payload.confirm) state.confirm = action.payload.confirm;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    resetPassword: (state) => {
      state.oldPassword = "";
      state.newPassword = "";
      state.confirm = "";
    },
  },
});

export const {
  setName,
  toggleActiveName,
  toggleBtnName,
  setPasswordData,
  setError,
  resetPassword,
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
  } catch (e) {
    dispatch(setError(e.response.data));
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

export default settingsSlice.reducer;
