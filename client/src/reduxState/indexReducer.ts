import { combineReducers } from "redux";

import openSideNavReducer from "./reducers/sideNavReducer";
import projectsReducer from "./reducers/projectsReducer";

const rootReducer = combineReducers({
  openSideNavReducer,
  projectsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
