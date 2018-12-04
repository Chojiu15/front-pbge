import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Membres from "./pages/Membres";
import HomepageLayout from "./pages/HomeLayout";
import Connexion from "./pages/Connexion";

/**
 * TODO : Make each component
 * The current router app
 */

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomepageLayout} />
        <Route exact path="/membres" component={Membres} />
        <Route exact path="/connexion" component={Connexion} />
        {/* <Route exact path="/annuaire" component={Annuaire} />
        <Route exact path="/entreprise" component={Entreprise} />
        <Route exact path="/enregistrement" component={Register} /> */}
      </Switch>
    </BrowserRouter>
  );
};
