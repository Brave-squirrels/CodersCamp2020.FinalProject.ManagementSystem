import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { Header, Main } from "hoc/indexHoc";

import LandingNotLogged from "./containers/landingNotLogged/landingNotLogged";
import Projects from "./containers/Projects/projects";
import Project from "./containers/Projects/project";
import LandingLogged from "containers/landingLogged/landingLogged";
import ResNav from "./hoc/header/headerSideDrawer/headerSideDrawer";
import ErrorPage from "./hoc/errorPage/errorPage";

import SampleForm from "utils/sampleForm";

const App = () => {
  let check: boolean = true;
  let content;
  if (check) {
    content = (
      <>
        <Switch>
          <Route exact path="/" component={LandingNotLogged} />
          <Route component={ErrorPage} />
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
            <Route exact path="/user" component={LandingLogged} />
            <Route exact path="/projects/id" component={Project} />
            <Route exact path="/projects" component={Projects} />
            {/* Sample form */}
            <Route exact path="/sampleForm" component={SampleForm} />
            <Route component={ErrorPage} />
          </Switch>
        </Main>
      </>
    );
  }
  // }

  return content;
};

//Go props and state for authentication

export default withRouter(App);
