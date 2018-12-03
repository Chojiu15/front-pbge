import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import HomepageLayout from "./pages/HomeLayout";

/**
 * TODO : Make each component
 * The current router app
 */
export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomepageLayout} />
      </Switch>
    </BrowserRouter>
  );
};
