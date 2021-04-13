import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

const initialState = {
  open: false,
};

export const sideNavActionSlice = createSlice({
  name: "sideNavAction",
  initialState,
  reducers: {
    clickHamburger: (state) => {
      state.open = !state.open;
    },
  },
});

export const { clickHamburger } = sideNavActionSlice.actions;

export const selectOpen = (state: RootState) => state.sideNavAction.open;

export default sideNavActionSlice.reducer;
