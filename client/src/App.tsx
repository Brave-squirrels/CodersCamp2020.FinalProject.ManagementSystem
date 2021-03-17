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

import LandingNotLogged from "./containers/landingNotLogged/landingNotLogged";
import Projects from "./containers/Projects/projects";
import Project from "./containers/Projects/project";
import User from "./containers/User/user";
import LandingLogged from "containers/landingLogged/landingLogged";
import ResNav from "./hoc/header/headerSideDrawer/headerSideDrawer";
import ErrorPage from "./hoc/errorPage/errorPage";

import SampleForm from "utils/sampleForm";

import allActions from "reduxState/indexActions";

import { RootState } from "reduxState/actions/types";

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
            {/* <Route exact path="/" render={() => <LandingLogged />} /> */}
            <Route exact path="/" render={() => <User />} />
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
