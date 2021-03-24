import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../axios/axiosMain";
import { AppThunk, RootState } from "./store";

interface InitState {
  teams: [];
  projects: [];
  teamInvites: [];
}

const initialState: InitState = {
  teams: [],
  projects: [],
  teamInvites: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addTeams: (state, action: PayloadAction<[]>) => {
      state.teams = action.payload;
    },
    addProjects: (state, action: PayloadAction<[]>) => {
      state.projects = action.payload;
    },
    addTeamInvites: (state, action: PayloadAction<[]>) =>{
      state.teamInvites = action.payload;
    }
  },
});

export const { addTeams, addProjects } = userSlice.actions;

export const getTeamsProjects = (): AppThunk => async (dispatch) => {
  try {
    const response = (
      await axios("/users/me", {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
    ).data;
    dispatch(addTeams(response.teams));
    dispatch(addProjects(response.projects));
  } catch (e) {
    console.log("Error", e.response.data);
  }
};

export const selectTeams = (state: RootState) => state.user.teams;
export const selectProjects = (state: RootState) => state.user.projects;
export const selectTeamInvites = (state: RootState) => state.user.teamInvites;

export default userSlice.reducer;
