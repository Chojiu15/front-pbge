import PropTypes from "prop-types";
import React, {Component} from "react";
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

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
export default class DesktopNavBarContainer extends Component {
    state = {};

    constructor(props) {
        super(props);
        this.hideFixedMenu = this.hideFixedMenu.bind(this);
        this.showFixedMenu = this.showFixedMenu.bind(this);
    }

    hideFixedMenu = () => this.setState({fixed: false});
    showFixedMenu = () => this.setState({fixed: true});

    render() {
        const {children} = this.props;
        const {fixed} = this.state;

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
                        style={{padding: "0.2em 0em 0.2em 0em"}}
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
                                {/* <Image
                  size="tiny"
                  src={logoLinear}
                  style={{ marginRight: "1.5em" }}
                  wrapped
                  hidden={fixed}
                /> */}
                                <Menu.Item
                                    as="a"
                                    active
                                    href="./"
                                    color="red"
                                    style={{marginLeft: "1em", marginBottom: "0.2em"}}
                                >
                                    Accueil
                                </Menu.Item>
                                <Menu.Item
                                    as="a"
                                    active
                                    href="./enregistrement"
                                    color="green"
                                    style={{marginBottom: "0.2em"}}
                                >
                                    Entreprises
                                </Menu.Item>
                                <Menu.Item
                                    as="a"
                                    active
                                    href="./membres"
                                    color="red"
                                    style={{marginBottom: "0.2em"}}
                                >
                                    Membres
                                </Menu.Item>
                                <Menu.Item
                                    as="a"
                                    active
                                    href="./annuaire"
                                    color="green"
                                    style={{marginBottom: "0.2em"}}
                                >
                                    Annuaire
                                </Menu.Item>
                                <Menu.Item position="right">
                                    <Button as="a" inverted={!fixed} href="./connexion">
                                        Connectez-vous
                                    </Button>
                                    <Button
                                        as="a"
                                        inverted={!fixed}
                                        href="./enregistrement"
                                        style={{marginLeft: "0.5em"}}
                                    >
                                        Enregistrez-vous
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

DesktopNavBarContainer.propTypes = {
    children: PropTypes.node
};
