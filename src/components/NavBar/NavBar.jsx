import PropTypes from "prop-types";
import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";

import DesktopNavBarContainer from "./NavBarDesktop";
import MobileNavBarContainer from "./NavBarMobile";
import DesktopConnectedNavBarContainer from "./ConnectedNavDesktop";
import MobileConnectedNavBarContainer from "./ConnectedNavMobile";
import "./NavBar.css";
import HomepageLayout from "../../pages/HomeLayout";

export default class NavBarLayout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.userData.isAuthenticated === true) {
      return (
        <div>
          <DesktopConnectedNavBarContainer
            userData={this.props.userData}
            children={this.props.children}
          />
          <MobileConnectedNavBarContainer
            userData={this.props.userData}
            children={this.props.children}
          />
        </div>
      );
    } else {
      return (
        <div>
          <DesktopNavBarContainer
            userData={this.props.userData}
            children={this.props.children}
          />
          <MobileNavBarContainer
            userData={this.props.userData}
            children={this.props.children}
          />
        </div>
      );
    }
  }
}
