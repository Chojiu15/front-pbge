import React, { Component } from "react";
import NavBarLayout from "../components/NavBar/ConnectedNavDesktop";

export default class MyProfile extends Component {
  state = {};
  render() {
    return <NavBarLayout userData={this.state} />;
  }
}
