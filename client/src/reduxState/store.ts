import {
  configureStore,
  ThunkAction,
  Action,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import createUserReducer from "./createUserSlice";
import loginReducer from "./loginSlice";
import settingsReducer from "./settingsSlice";
import sideNavActionReducer from "./sideNavActionSlice";
import sendForgotPassword from "./sendForgotPassword";
import changePasswordLanding from "./changePasswordLoggedOut";
import singleTeamData from "./teamDataSlice";
import singleProjectData from "./projectDataSlice";
import sendVerifyAgain from "./sendVerifyAgain";
import createTeamSlice from "./createTeam";
import handleTeamInvite from "./teamInvites";
import createProjectSlice from './createProject';
import notesData from './notes/fetchNotes';
import notesCreate from './notes/postNote';

import thunk from "redux-thunk";

export const store = configureStore({
  reducer: {
    createUser: createUserReducer,
    login: loginReducer,
    settings: settingsReducer,
    sideNavAction: sideNavActionReducer,
    sendForgotPassword: sendForgotPassword,
    changePasswordLanding: changePasswordLanding,
    singleTeamData: singleTeamData,
    sendVerifyAgain: sendVerifyAgain,
    singleProjectData: singleProjectData,
    createTeamSlice: createTeamSlice,
    handleTeamInvite: handleTeamInvite,
    createProjectSlice:createProjectSlice,
    notesData: notesData,
    notesCreate:notesCreate,
  },
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
    thunk,
  ],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
