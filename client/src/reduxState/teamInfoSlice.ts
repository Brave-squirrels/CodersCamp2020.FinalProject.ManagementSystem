import { createSlice } from "@reduxjs/toolkit";

interface Validate {
  teamName: boolean;
  teamDescription: boolean;
}

const initialState: Validate = { teamName: true, teamDescription: true };

const teamInfoValidation = createSlice({
  name: "teamInfoValidation",
  initialState,
  reducers: {
    teamNameTrue(state) {
      state.teamName = true;
    },
    teamNameFalse(state) {
      state.teamName = false;
    },
    teamDescriptionTrue(state) {
      state.teamDescription = true;
    },
    teamDescriptionFalse(state) {
      state.teamDescription = false;
    },
  },
});

export const {
  teamNameFalse,
  teamNameTrue,
  teamDescriptionFalse,
  teamDescriptionTrue,
} = teamInfoValidation.actions;

export default teamInfoValidation.reducer;
