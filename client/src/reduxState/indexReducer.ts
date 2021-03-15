import { combineReducers } from "redux";

import openSideNavReducer from "./reducers/sideNavReducer";
import projectsReducer from "./reducers/projectsReducer";
import createUserReducer from './reducers/crateUserReducer';
import loginUserReducer from './reducers/loginUserReducer';

const rootReducer = combineReducers({
  openSideNavReducer,
  projectsReducer,
  createUserReducer,
  loginUserReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
