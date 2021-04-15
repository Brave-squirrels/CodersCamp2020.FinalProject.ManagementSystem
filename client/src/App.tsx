import React, { useEffect, Suspense } from "react";
import {
  Route,
  Switch,
  withRouter,
  useLocation,
  useHistory,
} from "react-router-dom";
import { Header, Main, ErrorPage } from "hoc/indexHoc";
import { useSelector, useDispatch } from "react-redux";
import SuspenseSpinner from "components/UI/suspenseSpinner/suspenseSpinner";
import ResetPassword from "containers/resetPassword/resetPassword";

import { authUser, logout } from "reduxState/loginSlice";
import { RootState } from "reduxState/store";

const LandingNotLogged = React.lazy(
  () => import("./containers/landingNotLogged/landingNotLogged")
);
const Project = React.lazy(
  () => import("./containers/Projects/Project/project")
);
const Team = React.lazy(() => import("./containers/Teams/Team/team"));
const User = React.lazy(() => import("./containers/User/user"));
const UserSettings = React.lazy(
  () => import("./containers/UserSettings/userSettings")
);
const Confirmed = React.lazy(() => import("./containers/Confirmed/Confirmed"));
const ResNav = React.lazy(
  () => import("./hoc/header/headerSideDrawer/headerSideDrawer")
);
const ForgotPassword = React.lazy(
  () => import("./containers/forgotPassword/forgotPassword")
);
const CreateTeam = React.lazy(
  () => import("./containers/Teams/createTeam/createTeam")
);
const TeamInvites = React.lazy(
  () => import("./containers/teamInvites/teamInvites")
);
const Tasks = React.lazy(() => import("./containers/Tasks/tasks"));

const Notes = React.lazy(() => import("./containers/notes/notes"));

const App = () => {
  const loginState = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch();

  const location = useLocation();
  const history = useHistory();

  /* Logout handle */
  history.listen((currentLocation) => {
    if (currentLocation.pathname === "/logout") {
      currentLocation.pathname = "/";
      dispatch(logout());
    }
  });

  useEffect(() => {
    if (location.pathname === "/" && !localStorage.getItem("token")) return;
    dispatch(authUser());
  }, [location, dispatch, loginState.token]);

  let content;
  if (!localStorage.getItem("token")) {
    content = (
      <>
        <Switch>
          <Route exact path="/" render={() => <LandingNotLogged />} />
          <Route
            exact
            path="/forgotpassword"
            render={() => <ForgotPassword />}
          />
          <Route exact path="/confirmed" render={() => <Confirmed />} />
          <Route path="/resetPassword" render={() => <ResetPassword />} />
          <Route component={ErrorPage} />
        </Switch>
      </>
    );
  } else {
    content = (
      <div className="wrapper">
        <ResNav />
        <Header />
        <Main>
          <Switch>
            <Route exact path="/" render={() => <User />} />
            <Route exact path="/teams/:teamId" component={Team} />
            <Route exact path="/createTeam" component={CreateTeam} />
            <Route
              exact
              path="/teams/:teamId/projects/:projectId"
              component={Project}
            />
            <Route exact path="/confirmed" render={() => <Confirmed />} />
            <Route exact path="/teaminvites" render={() => <TeamInvites />} />
            <Route exact path="/settings" render={() => <UserSettings />} />
            <Route
              exact
              path="/teams/:teamId/projects/:projectId/tasks"
              render={() => <Tasks />}
            />
            <Route
              exact
              path="/teams/:teamId/projects/:projectId/notes"
              component={Notes}
            />
            <Route exact path="/logout" />
            <Route component={ErrorPage} />
          </Switch>
        </Main>
      </div>
    );
  }

  return <Suspense fallback={<SuspenseSpinner />}>{content}</Suspense>;
};

export default withRouter(App);
