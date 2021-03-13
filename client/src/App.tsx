import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { Header, Main } from "hoc/indexHoc";

import LandingNotLogged from "./containers/landingNotLogged/landingNotLogged";
import LandingLogged from "./components/landingLogged/landingLogged";
import ResNav from "./hoc/header/resHeader/resHeader";
import Projects from "./containers/Projects/projects";

const App = () => {
  let routes = (
    <Switch>
      <Route path="/user" component={LandingLogged} />
      <Route path="/projects" component={Projects} />
      <Route path="/" component={LandingNotLogged} />
    </Switch>
  );

  return (
    <>
      <ResNav />
      <Header />
      <Main>{routes}</Main>
    </>
  );
};

//Go props and state for authentication

export default withRouter(App);
