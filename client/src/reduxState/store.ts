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
import thunk from "redux-thunk";

export const store = configureStore({
  reducer: {
    createUser: createUserReducer,
    login: loginReducer,
    sideNavAction: sideNavActionReducer,
    inputValidation: inputValidationSlice,
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
