import React, {Component} from "react";
import {Form, Radio, Dropdown, Button, Container, Segment} from "semantic-ui-react";
import Activite from "./secteurActivite.jsx";
import axios from "axios";
import NavBarLayout from "../components/NavBar/NavBar";

import {createRequest} from "../api/Request.params";
//import { HREF } from "./parametres";
import {apiGetRequest} from "../api/Api.js";
import Results from "../components/Annuaire/Results";

export default class RadioExampleRadioGroup extends Component {
    state = {};
    handleChange = (e, {value}) => this.setState({value});
    handleSelect = (e, {sector}) => this.setState({sector});

    constructor(props) {
        super(props);
        this.state = {
            companies: "",
            sector: "",
            value: "member",
            results: []
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(type, sector) {
        if (type === "member") {
            const request = createRequest();
            const getMembers = apiGetRequest(request);
            getMembers("/api/members").then(response => {
                console.log(response.data);
                this.setState({results: response.data});
            });
        } else {
            const request = createRequest();
            const getCompanies = apiGetRequest(request);
            getCompanies("/api/companies").then(response => {
                this.setState({results: response.data});
            });
        }
    }

    render() {
        return (
            <NavBarLayout userData={this.state}>
                <Container>
                    <Segment style={{padding: "7.3em 0em"}}
                             vertical
                             position="center"
                             textAlign="center">
                        <Form
                            onSubmit={e => {
                                e.preventDefault();
                                const type = this.state.value;
                                const sector = this.state.sector;
                                this.onSubmit(type, sector);
                            }}
                        >
                            <Form.Field>
                                <Radio
                                    label="Membre"
                                    name="radioGroup"
                                    value="member"
                                    checked={this.state.value === "member"}
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Radio
                                    label="Entreprise"
                                    name="radioGroup"
                                    value="company"
                                    checked={this.state.value === "company"}
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Dropdown
                                    name="sector"
                                    placeholder="Secteur d'activité"
                                    fluid
                                    selection
                                    options={Activite}
                                    onChange={this.handleSelect}
                                />
                            </Form.Field>
                            <Button color="green" type="submit">
                                Rechercher
                            </Button>
                        </Form>
                    </Segment>
                    <Segment style={{padding: "7.3em 0em"}}
                             vertical
                             position="center"
                             textAlign="center">

                        <Results type={this.state.value} usersData={this.state.results}/>
                    </Segment>
                </Container>
            </NavBarLayout>
        );
    }
}
