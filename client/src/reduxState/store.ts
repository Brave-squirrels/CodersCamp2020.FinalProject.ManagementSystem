import {
  configureStore,
  ThunkAction,
  Action,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import createUserReducer from "./createUserSlice";
import loginReducer from "./loginSlice";
import sideNavActionReducer from "./sideNavActionSlice";
import sendForgotPassword from "./sendForgotPassword";
import changePasswordLanding from "./changePasswordLoggedOut";
import singleTeamData from './teamDataSlice';
import singleProjectData from "./projectDataSlice";
import sendVerifyAgain from './sendVerifyAgain';
import createTeamSlice from './createTeam';

import thunk from "redux-thunk";

export const store = configureStore({
  reducer: {
    createUser: createUserReducer,
    login: loginReducer,
    sideNavAction: sideNavActionReducer,
    sendForgotPassword: sendForgotPassword,
    changePasswordLanding: changePasswordLanding,
    singleTeamData: singleTeamData,
    sendVerifyAgain: sendVerifyAgain,
    singleProjectData: singleProjectData,
    createTeamSlice:createTeamSlice,
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
