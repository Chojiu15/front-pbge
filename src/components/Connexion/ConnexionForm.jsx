import React, { Component } from "react";
import {
  Button,
  Header,
  Message,
  Radio,
  Segment,
  Grid,
  Form
} from "semantic-ui-react";

import { createRequest } from "../../api/Request.params";
import * as Auth from "../../api/Auth";

const MEMBER_ROUTE = "/member/login";
const COMPANY_ROUTE = "/company/login";
const BAD_CREDENTIALS_MSG = "Login ou mot de passe incorrect.";
const SERVER_ERROR_MSG = "An expected error happened, try again later.";

export default class ConnexionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "member",
      isAuthenticated: false
    };
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleRadioChange = (e, { value }) => this.setState({ value });

  onSubmit(credentials, usertype) {
    let route = "";
    usertype === "member" ? (route = MEMBER_ROUTE) : (route = COMPANY_ROUTE);

    const request = createRequest();
    const authentication = Auth.authRequest(request);
    authentication(route, credentials)
      .then(response => {
        Auth.removeToken();
        Auth.saveToken(response.data.token);
        //this.props.history.push("/");
      })
      .catch(e => {
        if (typeof e.response !== "undefined") {
          if (e.response.status === 401) {
            alert(BAD_CREDENTIALS_MSG);
          } else {
            alert("Error " + e.response.status + ": " + SERVER_ERROR_MSG);
          }
        } else {
          alert(e.message);
        }
      });
  }

  render() {
    return (
      <div className="login-form">
        <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
        <Grid
          textAlign="center"
          style={{ height: "100%", padding: "4em" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="red" textAlign="center">
              Connectez-vous à votre compte
            </Header>

            <Form
              size="large"
              onSubmit={e => {
                e.preventDefault();
                const username = e.target.elements.username.value;
                const password = e.target.elements.password.value;
                const usertype = this.state.value;
                this.onSubmit({ username, password }, usertype);
              }}
            >
              <Form.Field>
                <Radio
                  label="Membre"
                  name="radioGroup"
                  value="member"
                  checked={this.state.value === "member"}
                  onChange={this.handleRadioChange}
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  label="Entreprise"
                  name="radioGroup"
                  value="company"
                  checked={this.state.value === "company"}
                  onChange={this.handleRadioChange}
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
  }
}
