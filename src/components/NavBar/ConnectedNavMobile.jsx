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

    constructor(props) {
        super(props);
        this.handlePusherClick = this.handlePusherClick.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
    }

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
                        animation="push"
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
                            textAlign="center"
                            style={{minHeight: 350, padding: "1em 0em"}}
                            vertical
                        >
                            <Container>
                                <Menu pointing secondary size="large">
                                    <Menu.Item onClick={this.handleToggle}>
                                        <Icon name="sidebar"/>
                                    </Menu.Item>
                                    <Menu.Item position="right">
                                        <Button as="a" href="./profil">
                                            Mon Profil
                                        </Button>
                                        <Button
                                            onClick={this.logOut}
                                            as="a"
                                            style={{ marginLeft: "0.5em" }}
                                            href="./"
                                        >
                                            Se Déconnecter
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

MobileConnectedNavBarContainer.propTypes = {
    children: PropTypes.node
};