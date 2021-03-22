import {
  configureStore,
  ThunkAction,
  Action,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import createUserReducer from "./createUserSlice";
import loginReducer from "./loginSlice";
import sideNavActionReducer from "./sideNavActionSlice";

import inputValidationSlice from "./teamInfoSlice";

import sendForgotPassword from "./sendForgotPassword";
import changePasswordLanding from "./changePasswordLoggedOut";
import userReducer from "./userSlice";

import thunk from "redux-thunk";

export const store = configureStore({
  reducer: {
    createUser: createUserReducer,
    login: loginReducer,
    sideNavAction: sideNavActionReducer,
    inputValidation: inputValidationSlice,
    sendForgotPassword: sendForgotPassword,
    changePasswordLanding: changePasswordLanding,
    user: userReducer,
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
