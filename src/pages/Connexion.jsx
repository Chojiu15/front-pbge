import React, { Component } from "react";

import NavBarLayout from "../components/NavBar/NavBar";
import ConnexionForm from "../components/Connexion/ConnexionForm";

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "member",
      isAuthenticated: false
    };
  }

  render() {
    return (
      <NavBarLayout
        userData={this.state}
        children={<ConnexionForm userData={this.state} />}
      />
    );
  }
}
