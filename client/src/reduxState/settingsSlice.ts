import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../axios/axiosMain";
import { AppThunk, RootState } from "./store";

interface Data {
  name: string;
}

interface InitState {
  name: string;
}

const initialState: InitState = {
  name: "",
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const { setName } = settingsSlice.actions;

export const changeName = (data: Data): AppThunk => async () => {
  const token = localStorage.getItem("token");
  try {
    await axios.put("/users/name", data, {
      headers: { "x-auth-token": `${token}` },
    });
  } catch (e) {
    console.log("Error", e.response.data);
  }
};

export const selectName = (state: RootState) => state.settings.name;

export default settingsSlice.reducer;
