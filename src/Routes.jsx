import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import HomepageLayout from "./pages/HomeLayout";
import Connexion from "./pages/Connexion";
import Register from "./pages/Register";

/**
 * TODO : Make each component
 * The current router app
 */

export default () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={HomepageLayout}/>
                <Route exact path="/connexion" component={Connexion}/>
                <Route exact path="/enregistrement" component={Register}/>
            </Switch>
        </BrowserRouter>
    );
};
