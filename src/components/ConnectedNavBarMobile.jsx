import PropTypes from "prop-types";
import React, {Component} from "react";
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

export default class MobileConnectedNavBarContainer extends Component {
    state = {};

    handlePusherClick = () => {
        const {sidebarOpened} = this.state;

        if (sidebarOpened) this.setState({sidebarOpened: false});
    };

    handleToggle = () =>
        this.setState({sidebarOpened: !this.state.sidebarOpened});

    render() {
        const {children} = this.props;
        const {sidebarOpened} = this.state;

        return (
            <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
                <Sidebar.Pushable>
                    <Sidebar
                        as={Menu}
                        animation="uncover"
                        inverted
                        vertical
                        visible={sidebarOpened}
                    >
                        <Menu.Item as="a" active href="./">
                            Accueil
                        </Menu.Item>
                        <Menu.Item as="a" href="./entreprise">
                            Entreprise
                        </Menu.Item>
                        <Menu.Item as="a" href="./membres">
                            Membres
                        </Menu.Item>
                        <Menu.Item as="a" href="./annuaire">
                            Annuaire
                        </Menu.Item>
                    </Sidebar>

                    <Sidebar.Pusher
                        dimmed={sidebarOpened}
                        onClick={this.handlePusherClick}
                        style={{minHeight: "100vh"}}
                    >
                        <Segment
                            inverted
                            textAlign="center"
                            style={{minHeight: 350, padding: "1em 0em"}}
                            vertical
                        >
                            <Container>
                                <Menu inverted pointing secondary size="large">
                                    <Menu.Item onClick={this.handleToggle}>
                                        <Icon name="sidebar"/>
                                    </Menu.Item>
                                    <Menu.Item position="right">
                                        <Button as="a" inverted>
                                            Connexion
                                        </Button>
                                        <Button as="a" inverted style={{marginLeft: "0.5em"}}>
                                            Enregistrement
                                        </Button>
                                    </Menu.Item>
                                </Menu>
                            </Container>
                        </Segment>

                        {children}
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </Responsive>
        );
    }
}

MobileConnectedNavBarContainer.propTypes = {
    children: PropTypes.node
};