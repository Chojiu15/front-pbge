import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomepageLayout from "./pages/HomeLayout";
import Connexion from "./pages/Connexion";
import RegisterForm from "./pages/Register";
import Annuaire from "./pages/Annuaire";
import Profil from "./pages/MyProfil";

/**
 * TODO : Make each component
 * The current router app
 */

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomepageLayout} />
        <Route exact path="/connexion" component={Connexion} />
        <Route exact path="/enregistrement" component={RegisterForm} />
        <Route exact path="/annuaire" component={Annuaire} />
        <Route exact path="/profil" component={Profil} />
      </Switch>
    </BrowserRouter>
  );
};
