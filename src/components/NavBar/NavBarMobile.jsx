import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  Button,
  Container,
  Icon,
  Menu,
  Responsive,
  Segment,
  Sidebar
} from "semantic-ui-react";

import "./NavBar.css";

export default class MobileNavBarContainer extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.handlePusherClick = this.handlePusherClick.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handlePusherClick = () => {
    const { sidebarOpened } = this.state;

    if (sidebarOpened) this.setState({ sidebarOpened: false });
  };

  handleToggle = () =>
    this.setState({ sidebarOpened: !this.state.sidebarOpened });

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            animation="push"
            inverted
            vertical
            visible={sidebarOpened}
          >
            <Menu.Item as="a" active href="/">
              Accueil
            </Menu.Item>
            <Menu.Item as="a" href="/enregistrement">
              Enregistrement
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher
            dimmed={sidebarOpened}
            onClick={this.handlePusherClick}
            style={{ minHeight: "100vh" }}
          >
            <Segment
              textAlign="center"
              style={{ minHeight: 350, padding: "1em 0em" }}
              vertical
            >
              <Container>
                <Menu pointing secondary size="large">
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name="sidebar" />
                  </Menu.Item>
                  <Menu.Item position="right">
                    <Button href="/connexion" as="a">
                      Connexion
                    </Button>
                  </Menu.Item>
                </Menu>
              </Container>
              {children}
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Responsive>
    );
  }
}

MobileNavBarContainer.propTypes = {
  children: PropTypes.node
};
