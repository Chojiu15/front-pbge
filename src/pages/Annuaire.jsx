import React, {Component} from "react";
import {Form, Radio, Dropdown, Button, Container, Segment, Card} from "semantic-ui-react";
import axios from "axios";
import NavBarLayout from "../components/NavBar/NavBar";
import { Redirect } from "react-router-dom";

import {createRequest, createTokenRequest} from "../api/Request.params";
//import { HREF } from "./parametres";
import {apiGetRequest} from "../api/Api.js";
import Results from "../components/Annuaire/Results";
import * as Auth from "../api/Auth";

export default class RadioExampleRadioGroup extends Component {
    state = {};

    handleChange = (e, {value}) => this.setState({type:value});

    handleSelect = (e, {value}) => this.setState(value>0 ? {sectorId:value} : {sectorId:0});

    constructor(props) {
        super(props);
        this.state = {
            companies: "",
            sectorId: 0,
            type: "member",
            resultType: "member",
            sectors: [],
            results: [],
            isAuthenticated: true
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.getSectors = this.getSectors.bind(this);
        this.loginCheck = this.loginCheck.bind(this);
    }

    loginCheck() {
        let token = Auth.getToken();
        if (token == null) {
            this.setState({
                isAuthenticated: false
            });
            return false;
        }
        else {
            const checkToken = createTokenRequest(token);
            const checkRequest = Auth.tokenChecker(checkToken);
            checkRequest().then(response => {
                this.setState({
                    isAuthenticated: true
                });
                return true;
            }).catch(() => {
                this.setState({
                    isAuthenticated: false
                });
                return false;
            })
        }
    }

    getSectors() {
        const request = createRequest();
        const getSectors = apiGetRequest(request);
        getSectors("/api/sectors").then(response => {
            let sectors = response.data.map(sector => (
                {
                    key: sector.id,
                    value: sector.id,
                    text: sector.name
                }
            ));
            this.setState({sectors});
        });
    }

    onSubmit() {
        const request = createRequest();
        const getResults = apiGetRequest(request);

        if(this.state.sectorId !== 0) {
            if (this.state.type === "member") {
                getResults("/api/sectors/" + this.state.sectorId + "/members").then(response => {
                    this.setState({
                        results: response.data,
                        resultType: "member"
                    });
                });
            } else {
                getResults("/api/sectors/" + this.state.sectorId + "/companies").then(response => {
                    this.setState({
                        results: response.data,
                        resultType: "company"
                    });
                });
            }
        }
        else {
            if (this.state.type === "member") {
                getResults("/api/members").then(response => {
                    this.setState({
                        results: response.data,
                        resultType: "member"
                    });
                });
            } else {
                getResults("/api/companies").then(response => {
                    this.setState({
                        results: response.data,
                        resultType: "company"
                    });
                });
            }
        }
    }

    componentDidMount() {
        this.loginCheck();
    }

    render() {
        if(!this.state.isAuthenticated) {
            return <Redirect to={"./connexion"}/>
        }
        else {
            if (this.state.sectors.length === 0) {
                this.getSectors();
            }
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
                                    this.onSubmit();
                                }}
                            >
                                <Form.Field>
                                    <Radio
                                        label="Membre"
                                        name="radioGroup"
                                        value="member"
                                        checked={this.state.type === "member"}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Radio
                                        label="Entreprise"
                                        name="radioGroup"
                                        value="company"
                                        checked={this.state.type === "company"}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Dropdown
                                        name="sector"
                                        placeholder="Secteur d'activité"
                                        fluid
                                        selection
                                        clearable
                                        options={this.state.sectors}
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

                            <Card.Group>
                                <Results type={this.state.resultType} usersData={this.state.results}/>
                            </Card.Group>
                        </Segment>
                    </Container>
                </NavBarLayout>
            );
        }
    }
}
