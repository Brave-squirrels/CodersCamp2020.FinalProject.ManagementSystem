import React, { useEffect, Suspense } from "react";
import {
  Route,
  Switch,
  withRouter,
  useLocation,
  Redirect,
  useHistory,
} from "react-router-dom";
import { Header, Main } from "hoc/indexHoc";
import { useSelector, useDispatch } from "react-redux";

import SampleForm from "utils/sampleForm";

import allActions from "reduxState/indexActions";

import { RootState } from "reduxState/actions/types";

const LandingNotLogged = React.lazy(
  () => import("./containers/landingNotLogged/landingNotLogged")
);
const Projects = React.lazy(() => import("./containers/Projects/projects"));
const Project = React.lazy(() => import("./containers/Projects/project"));
const LandingLogged = React.lazy(
  () => import("containers/landingLogged/landingLogged")
);
const ResNav = React.lazy(
  () => import("./hoc/header/headerSideDrawer/headerSideDrawer")
);
const ErrorPage = React.lazy(() => import("./hoc/errorPage/errorPage"));
const ForgotPassword = React.lazy(
  () => import("./containers/forgotPassword/forgotPassword")
);

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
        {localStorage.getItem("token") ? null : <Redirect to="/" />}
        <Switch>
          <Route exact path="/" render={() => <LandingNotLogged />} />
          <Route
            exact
            path="/forgotpassword"
            render={() => <ForgotPassword />}
          />
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
            <Route exact path="/" render={() => <LandingLogged />} />
            <Route exact path="/projects/id" component={Project} />
            <Route exact path="/teams" render={() => <Projects />} />
            <Route exact path="/logout" />
            {/* Sample form */}
            <Route exact path="/sampleForm" component={SampleForm} />
            <Route component={ErrorPage} />
          </Switch>
        </Main>
      </>
    );
  }

  return <Suspense fallback={<p>Loading</p>}>{content}</Suspense>;
};

export default withRouter(App);
