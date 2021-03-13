import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { Header, Main } from "hoc/indexHoc";

import LandingNotLogged from "./containers/landingNotLogged/landingNotLogged";
import Projects from "./containers/Projects/projects";
import Project from "./containers/Projects/project";
import LandingLogged from "containers/landingLogged/landingLogged";
import ResNav from "./hoc/header/headerSideDrawer/headerSideDrawer";

const App = () => {
  let check: boolean = true;
  let content;
  // if (check) {
  //   content = (
  //     <>
  //       <LandingNotLogged />
  //     </>
  //   );
  // } else {
  content = (
    <>
      <ResNav />
      <Header />
      <Main>
        <Switch>
          <Route path="/user" component={LandingLogged} />
          <Route path="/projects/id" component={Project} />
          <Route path="/projects" component={Projects} />
        </Switch>
      </Main>
    </>
  );
  // }

  return content;
};

//Go props and state for authentication

export default withRouter(App);
