import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Membres from "./pages/Membres";
import HomepageLayout from "./pages/HomeLayout";
import Connexion from "./pages/Connexion";
import Register from "./pages/Register";
import Annuaire from "./pages/Annuaire";
import Select from "./pages/Select.jsx";

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
        <Route exact path="/enregistrement" component={Register} />
        <Route exact path="/annuairee" component={Annuaire} />
        <Route exact path="/annuaire" component={Select} />

        {/* <Route exact path="/annuaire" component={Annuaire} />
        <Route exact path="/entreprise" component={Entreprise} />
        <Route exact path="/enregistrement" component={Register} /> */}
      </Switch>
    </BrowserRouter>
  );
};
