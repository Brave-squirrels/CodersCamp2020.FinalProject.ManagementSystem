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
import allActions from "reduxState/indexActions";
import { RootState } from "reduxState/actions/types";

const LandingNotLogged = React.lazy(
  () => import("./containers/landingNotLogged/landingNotLogged")
);
const Projects = React.lazy(() => import("./containers/Projects/projects"));
const Project = React.lazy(() => import("./containers/Projects/project"));
const Teams = React.lazy(() => import("./containers/Teams/teams"));
const Team = React.lazy(() => import("./containers/Teams/team"));
const User = React.lazy(() => import("./containers/User/user"));
const Confirmed = React.lazy(() => import("./containers/Confirmed/Confirmed"));
const ResNav = React.lazy(
  () => import("./hoc/header/headerSideDrawer/headerSideDrawer")
);
const ForgotPassword = React.lazy(
  () => import("./containers/forgotPassword/forgotPassword")
);
const CreateTeam = React.lazy(() => import("./containers/Teams/createTeam"));

interface LoginState {
  loading: boolean;
  error: Error | null;
  id: string | null;
  token: string | null;
  success: boolean;
}

const App = () => {
  const loginState: LoginState = useSelector(
    (state: RootState) => state.loginUserReducer
  );
  const dispatch: any = useDispatch();

  const location = useLocation();
  const history = useHistory();

  /* Logout handle */
  history.listen((currentLocation) => {
    if (currentLocation.pathname === "/logout") {
      dispatch(allActions.logout());
      currentLocation.pathname = "/";
    }
  });

  useEffect(() => {
    if (location.pathname === "/" && !localStorage.getItem("token")) return;
    dispatch(allActions.authUser());
  }, [location, dispatch, loginState.token]);

  let content;
  if (!localStorage.getItem("token")) {
    content = (
      <>
        {localStorage.getItem("token") ? null : location.pathname ===
          "/confirmed" ? null : (
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
        </Switch>
      </>
    );
  } else {
    content = (
      <>
        <ResNav />
        <Header />
        <Main>
          <Switch>
            <Route exact path="/" render={() => <User />} />
            <Route exact path="/teams/id" component={Team} />
            <Route exact path="/teams" component={Teams} />
            <Route exact path="/createTeam" component={CreateTeam} />
            <Route exact path="/projects/id" component={Project} />
            <Route exact path="/projects" component={Projects} />
            <Route exact path="/teams" render={() => <h1>Teams</h1>} />
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
      </>
    );
  }

  return <Suspense fallback={<SuspenseSpinner />}>{content}</Suspense>;
};

export default withRouter(App);
