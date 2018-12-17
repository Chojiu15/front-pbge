import React, { Component } from "react";

import NavBarLayout from "../components/NavBar/NavBar";
import * as Auth from "../api/Auth.js";
import { createTokenRequest } from "../api/Request.params";
import HomeContent from "../components/Homepage/HomeContent";
import ConnectedHomeContent from "../components/Homepage/ConnectedHomeContent";

export default class HomepageLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      userId: null,
      userType: null
    };
    this.loginCheck = this.loginCheck.bind(this);
  }

  loginCheck() {
    let token = Auth.getToken();
    if (token == null) return false;
    else {
      const checkToken = createTokenRequest(token);
      const checkRequest = Auth.tokenChecker(checkToken);
      checkRequest()
        .then(response => {
          this.setState({
            isAuthenticated: true,
            userId: response.data.id,
            userName: response.data.name,
            userType: response.data.type
          });
          return true;
        })
        .catch(() => {
          return false;
        });
    }
  }

  render() {
    if (!this.state.isAuthenticated) {
      this.loginCheck();
    }
    if (this.state.isAuthenticated) {
      return (
        <div>
          <NavBarLayout
            userData={this.state}
            children={<ConnectedHomeContent />}
          />
        </div>
      );
    } else {
      return (
        <div>
          <NavBarLayout userData={this.state} children={<HomeContent />} />
        </div>
      );
    }
  }
}
