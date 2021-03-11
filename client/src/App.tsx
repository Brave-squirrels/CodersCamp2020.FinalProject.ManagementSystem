import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { Header, Main } from "./hoc/indexHoc";

import LandingNotLogged from "./containers/landingNotLogged/landingNotLogged";
import LandingLogged from "./components/landingLogged/landingLogged";

const App: any = () => {
  let routes = (
    <Switch>
      <Route path="/user" component={LandingLogged} />
      <Route path="/" component={LandingNotLogged} />
    </Switch>
  );

  return (
    <>
      <Header />
      <Main>{routes}</Main>
    </>
  );
};

//Go props and state for authentication

export default withRouter(App);
