import React, { useEffect, Suspense } from "react";
import {
  Route,
  Switch,
  withRouter,
  useLocation,
  Redirect,
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
const Projects = React.lazy(
  () => import("./containers/Projects/Projects/projects")
);
const Project = React.lazy(
  () => import("./containers/Projects/Project/project")
);
const Teams = React.lazy(() => import("./containers/Teams/Teams/teams"));
const Team = React.lazy(() => import("./containers/Teams/Team/team"));
const User = React.lazy(() => import("./containers/User/user"));
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
const CreateProject = React.lazy(
  () => import("./containers/Projects/createProject/createProject")
);

interface LoginState {
  loading: boolean;
  error: Error | null;
  id: string | null;
  token: string | null;
  success: boolean;
}

const App = () => {
  const loginState: LoginState = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch();

  const location = useLocation();
  const history = useHistory();

  /* Logout handle */
  history.listen((currentLocation) => {
    if (currentLocation.pathname === "/logout") {
      dispatch(logout());
      currentLocation.pathname = "/";
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
        {localStorage.getItem("token") ? null : location.pathname ===
            "/confirmed" ||
          location.pathname.startsWith("/resetPassword") ? null : (
          <Redirect to="/" />
        )}
        <Switch>
          <Route exact path="/" render={() => <LandingNotLogged />} />
          <Route
            exact
            path="/forgotpassword"
            render={() => <ForgotPassword />}
          />
          <Route exact path="/confirmed" render={() => <Confirmed />} />
          <Route path="/resetPassword" render={() => <ResetPassword />} />
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
            <Route exact path="/teams" component={Teams} />
            <Route exact path="/createTeam" component={CreateTeam} />
            <Route exact path="/projects/id" component={Project} />
            <Route exact path="/projects" component={Projects} />
            <Route exact path="/createProject" component={CreateProject} />
            <Route exact path="/teams" render={() => <h1>Teams</h1>} />
            <Route exact path="/confirmed" render={() => <Confirmed />} />
            <Route
              exact
              path="/teaminvites"
              render={() => <h1>Team invites</h1>}
            />
            <Route exact path="/settings" render={() => <h1>Settings</h1>} />
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
