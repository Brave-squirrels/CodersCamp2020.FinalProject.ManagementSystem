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
import createProjectSlice from "./createProject";
import notesData from "./notes/fetchNotes";
import notesCreate from "./notes/postNote";
import deleteNote from "./notes/removeNote";
import changeNote from "./notes/editNotes";
import createTask from "./tasks/createTask";
import getTasks from "./tasks/getTasks";
import getTask from "./tasks/getSingleTask";
import deleteTask from "./tasks/deleteTask";
import editTask from "./tasks/editTask";
import editTaskMembers from "./tasks/editTaskMembers";
import commentCreate from "./comments/postComment";
import commentsData from "./comments/getComments";
import commentsDelete from "./comments/deleteComment";
import commentEdit from "./comments/editComment";
import updateMemberInProject from "./projects/updateMember";
import updateProjectStatus from "./projects/updateStatus";
import updateProjectInfo from "./projects/updateProjectInfo";
import deleteProject from "./projects/deleteProject";
import changeTeamDesc from "./teams/changeDescription";
import changeTeamTitle from "./teams/changeTitle";
import leaveTeam from "./teams/leaveTeam";
import deleteTeam from "./teams/deleteTeam";
import addTeamMember from "./teams/addMember";
import findUser from "./teams/findUser";
import changeTeamOwner from "./teams/changeOwner";
import changeTeamModerator from "./teams/changeModerators";
import removeTeamMember from "./teams/removeMember";
import removePendingUser from "./teams/removePending";

import thunk from "redux-thunk";

export const store = configureStore({
  reducer: {
    createUser: createUserReducer,
    login: loginReducer,
    settings: settingsReducer,
    sideNavAction: sideNavActionReducer,
    sendForgotPassword,
    changePasswordLanding,
    singleTeamData,
    sendVerifyAgain,
    singleProjectData,
    createTeamSlice,
    handleTeamInvite,
    createProjectSlice,
    notesData,
    notesCreate,
    deleteNote,
    changeNote,
    createTask,
    getTasks,
    getTask,
    deleteTask,
    editTask,
    editTaskMembers,
    commentCreate,
    commentsData,
    commentsDelete,
    commentEdit,
    updateMemberInProject,
    updateProjectStatus,
    updateProjectInfo,
    deleteProject,
    changeTeamDesc,
    changeTeamTitle,
    leaveTeam,
    deleteTeam,
    addTeamMember,
    findUser,
    changeTeamOwner,
    changeTeamModerator,
    removeTeamMember,
    removePendingUser,
  },
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
    thunk,
  ],
  devTools: false,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
