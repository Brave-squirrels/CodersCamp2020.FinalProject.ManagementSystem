import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import createUserReducer from "./createUserSlice";
import loginReducer from "./loginSlice";
import sideNavActionReducer from "./sideNavActionSlice";

export const store = configureStore({
  reducer: {
    createUser: createUserReducer,
    login: loginReducer,
    sideNavAction: sideNavActionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
