import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { Header, Main } from "hoc/indexHoc";

import LandingNotLogged from "./containers/landingNotLogged/landingNotLogged";
import LandingLogged from "containers/landingLogged/landingLogged";
import ResNav from "./hoc/header/headerSideDrawer/headerSideDrawer";

const App = () => {
  let check: boolean = true;
  let content;
  if (check) {
    content = (
      <>
        <LandingNotLogged />
      </>
    );
  } else {
    content = (
      <>
        <ResNav />
        <Header />
        <Main>
          <Switch>
            <Route path="/user" component={LandingLogged} />
          </Switch>
        </Main>
      </>
    );
  }

  return content;
};

//Go props and state for authentication

export default withRouter(App);
