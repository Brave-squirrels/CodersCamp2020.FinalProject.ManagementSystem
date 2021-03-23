import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import * as types from "../utils/types";

const initialState: types.TeamData = { ...types.baseTeamSetup };

const teamInfoValidation = createSlice({
  name: "teamData",
  initialState,
  reducers: {
    setData(state, action: PayloadAction<types.TeamData>) {
      state = { ...action.payload };
      // console.log(state);
    },
  },
});

export const { setData } = teamInfoValidation.actions;

export default teamInfoValidation.reducer;
