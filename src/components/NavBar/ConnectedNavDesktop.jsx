import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  Button,
  Container,
  Image,
  Menu,
  Responsive,
  Segment,
  Visibility
} from "semantic-ui-react";

import "./NavBar.css";
import logoLinear from "./logo_linear.jpeg";
import logo from "./logo.jpg";
import * as Auth from "../../api/Auth";

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
export default class DesktopConnectedNavBarContainer extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.hideFixedMenu = this.hideFixedMenu.bind(this);
    this.showFixedMenu = this.showFixedMenu.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  hideFixedMenu = () => this.setState({ fixed: false });
  showFixedMenu = () => this.setState({ fixed: true });

  logOut = () => {
    Auth.removeToken();
  };

  render() {
    const { children } = this.props;
    const { fixed } = this.state;
    return (
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign="center"
            style={{ padding: "0.2em 0em 0.2em 0em" }}
            vertical
          >
            <Menu
              fixed={fixed ? "top" : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
            >
              <Container fluid>
                <Menu.Item
                  as="a"
                  active
                  href="/"
                  color="red"
                  style={{ marginLeft: "1em", marginBottom: "0.2em" }}
                >
                  Accueil
                </Menu.Item>
                <Menu.Item
                  as="a"
                  active
                  href="/annuaire"
                  color="green"
                  style={{ marginBottom: "0.2em" }}
                >
                  Annuaire
                </Menu.Item>
                <Menu.Item position="right">
                  <Button as="a" inverted={!fixed} href="/profil">
                    Mon Profil
                  </Button>
                  <Button
                    onClick={this.logOut}
                    as="a"
                    inverted={!fixed}
                    style={{ marginLeft: "0.5em" }}
                    href="/"
                  >
                    Se Déconnecter
                  </Button>
                </Menu.Item>
              </Container>
            </Menu>
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    );
  }
}

DesktopConnectedNavBarContainer.propTypes = {
  children: PropTypes.node
};
