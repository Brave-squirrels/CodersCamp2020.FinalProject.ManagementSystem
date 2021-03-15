import { combineReducers } from "redux";

import openSideNavReducer from "./reducers/sideNavReducer";
import projectsReducer from "./reducers/projectsReducer";
import createUserReducer from './reducers/crateUser';

const rootReducer = combineReducers({
  openSideNavReducer,
  projectsReducer,
  createUserReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
