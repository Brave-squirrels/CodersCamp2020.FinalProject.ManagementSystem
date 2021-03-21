import { createSlice } from "@reduxjs/toolkit";
import * as validate from "./validators/team/teamValidators";

interface Validate {
  teamName: boolean;
  teamDescription: boolean;
}

const initialState: Validate = { teamName: true, teamDescription: true };

const teamInfoValidation = createSlice({
  name: "teamInfoValidation",
  initialState,
  reducers: {
    teamName(state, action) {
      state.teamName = validate.teamName(action.payload.value);
    },
    teamDescription(state, action) {
      state.teamDescription = validate.teamDescription(action.payload.value);
    },
  },
});

export const { teamName, teamDescription } = teamInfoValidation.actions;

export default teamInfoValidation.reducer;
