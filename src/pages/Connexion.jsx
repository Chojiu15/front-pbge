import React, {Component} from 'react'
import {
    Radio,
    Button,
    Form,
    Grid,
    Header,
    Image,
    Message,
    Segment
} from "semantic-ui-react";

import {createRequest} from "../api/Api.params";
import * as Auth from "../api/Auth";

const MEMBER_ROUTE = "/member/login";
const COMPANY_ROUTE = "/company/login";

export default class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 'member'
        };
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange = (e, { value }) => this.setState({ value });

    onSubmit(credentials , usertype) {
        let route = "";
        usertype === "member" ? route = MEMBER_ROUTE : route = COMPANY_ROUTE;

        const request = createRequest();
        const authentication = Auth.authRequest(request);
        authentication(route, credentials).then(response => {
            console.log(response.data);
        });
    }

    render() {
        return (
            <div className="login-form">
                {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
                <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
                <Button
                    color="red"
                    href="./"
                    style={{paddingtop: "3em", paddingbottom: "3em"}}
                >
                    Accueil
                </Button>
                <Grid textAlign="center" style={{height: "100%"}} verticalAlign="middle">
                    <Grid.Column style={{maxWidth: 450}}>
                        <Header as="h2" color="red" textAlign="center">
                            Connectez-vous à votre compte
                        </Header>

                        {/*<RadioFormComponent/>*/}

                        <Form size="large" onSubmit={e => {
                            e.preventDefault();
                            const username = e.target.elements.username.value;
                            const password = e.target.elements.password.value;
                            const usertype = this.state.value;
                            this.onSubmit({username, password}, usertype);
                        }}>
                            <Form.Field>
                                <Radio
                                    label='Membre'
                                    name='radioGroup'
                                    value='member'
                                    checked={this.state.value === 'member'}
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Radio
                                    label='Entreprise'
                                    name='radioGroup'
                                    value='company'
                                    checked={this.state.value === 'company'}
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
                            <Segment stacked>
                                <Form.Input
                                    type="email"
                                    name="username"
                                    fluid
                                    icon="user"
                                    iconPosition="left"
                                    placeholder="Adresse e-mail"
                                />
                                <Form.Input
                                    name="password"
                                    fluid
                                    icon="lock"
                                    iconPosition="left"
                                    placeholder="Mot de passe"
                                    type="password"
                                />

                                <Button type="submit" color="green" fluid size="large">
                                    Connexion
                                </Button>
                            </Segment>
                        </Form>
                        <Message>
                            Pas encore de compte ?{" "}
                            <a href="./enregistrement" color="red">
                                Créer un compte
                            </a>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        );
    };
}