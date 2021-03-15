import React, { useEffect, Suspense } from "react";
import {
  Route,
  Switch,
  withRouter,
  useLocation,
  Redirect,
} from "react-router-dom";
import { Header, Main } from "hoc/indexHoc";
import { useSelector, useDispatch } from "react-redux";

import LandingNotLogged from "./containers/landingNotLogged/landingNotLogged";
import Projects from "./containers/Projects/projects";
import Project from "./containers/Projects/project";
import LandingLogged from "containers/landingLogged/landingLogged";
import ResNav from "./hoc/header/headerSideDrawer/headerSideDrawer";
import ErrorPage from "./hoc/errorPage/errorPage";

import SampleForm from "utils/sampleForm";

import allActions from "reduxState/indexActions";

const App = () => {
  const loginState: any = useSelector((state: any) => state.loginUserReducer);
  const dispatch: any = useDispatch();

  const location = useLocation();

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
          <Route render={ErrorPage} />
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
