import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import LandingPage from "./containers/landingPage/LandingPage";

const App: any = () => {
  let routes = (
    <Switch>
      <Route path="/main" component={LandingPage} />
    </Switch>
  );

  return <>{routes}</>;
};

//Go props and state for authentication

export default withRouter(App);
