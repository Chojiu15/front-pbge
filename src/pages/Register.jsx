import React, { Component } from "react";
import {
  Form,
  Input,
  TextArea,
  Button,
  Select,
  Radio,
  Grid,
  Header,
  Segment
} from "semantic-ui-react";
import NavBarLayout from "../components/NavBar/NavBar";
import { Redirect } from "react-router-dom";

import { createRequest } from "../api/Request.params";
import * as Register from "../api/Register";
const MEMBER_ROUTE = "/member/register";
const COMPANY_ROUTE = "/company/register";
const USER_EXISTS_MSG = "Cet utilisateur existe déjà.";

export default class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "member",
      errorMsg: "",
      redirect: false,
      loading: false
    };
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleRadioChange = (e, { value }) => this.setState({ value });

  onSubmit(newUser, usertype) {
    let route = "";
    usertype === "member" ? (route = MEMBER_ROUTE) : (route = COMPANY_ROUTE);

    const request = createRequest();
    const register = Register.registerRequest(request);
    register(route, newUser)
      .then(response => {
        this.setState({ redirect: true });
      })
      .catch(e => {
        if (typeof e.response !== "undefined") {
          if (e.response.status === 403) {
            alert(USER_EXISTS_MSG);
          } else {
            alert(e.message);
          }
          this.setState({ loading: false });
        }
      });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/connexion" />;
    } else {
      return (
        <NavBarLayout userData={this.state}>
          <div className="register-form">
            <style>{`
      body > div,
      body > div > div,
      body > div > div > div.register-form {
        height: 100%;
      }
    `}</style>
            <Grid
              textAlign="center"
              style={{ height: "100%" }}
              verticalAlign="middle"
            >
              <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h2" color="red" textAlign="center">
                  Créer un compte
                </Header>

                <Form
                    size={"large"}
                    loading={this.state.loading}
                    onSubmit={e => {
                      e.preventDefault();

                      if(this.state.value === "member") {
                        const name = e.target.elements.lastName.value;
                        const surname = e.target.elements.firstName.value;
                        const username = e.target.elements.username.value;
                        const password = e.target.elements.password.value;
                        const passwordConfirm = e.target.elements.passwordConfirm.value;
                        if(password === passwordConfirm) {
                          this.setState({loading: true});
                          this.onSubmit(
                              { name, surname, username, password },
                              this.state.value
                          );
                        }
                        else {
                          this.setState({errorMsg:"Les mots de passe ne sont pas indentiques"})
                        }
                      }
                      else {
                        const name = e.target.elements.lastName.value;
                        const pdgName = e.target.elements.firstName.value;
                        const username = e.target.elements.username.value;
                        const password = e.target.elements.password.value;
                        const passwordConfirm = e.target.elements.passwordConfirm.value;
                        if(password === passwordConfirm) {
                          this.setState({loading: true});
                          this.onSubmit(
                              { name, pdgName, username, password },
                              this.state.value
                          );
                        }
                        else {
                          this.setState({errorMsg:"Les mots de passe ne sont pas indentiques"})
                        }
                      }
                    }}>
                  <Segment>
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
                  </Segment>
                  <Segment stacked>
                    <Form.Input
                      type="name"
                      name="lastName"
                      fluid
                      label={this.state.value === "member" ? "Nom" : "Nom de l'entreprise"}
                      placeholder={this.state.value === "member" ? "Nom" : "Nom de l'entreprise"}
                      required
                    />
                    <Form.Input
                      type="name"
                      name="firstName"
                      fluid
                      label={this.state.value === "member" ? "Prénom" : "Nom du directeur"}
                      placeholder={this.state.value === "member" ? "Prénom" : "Nom du directeur"}
                      required
                    />
                    <Form.Input
                      type="email"
                      name="username"
                      fluid
                      icon="user"
                      iconPosition="left"
                      label="Adresse e-mail"
                      placeholder="Adresse e-mail"
                      required
                    />
                    <Form.Input
                      type="password"
                      name="password"
                      fluid
                      icon="lock"
                      iconPosition="left"
                      label="Mot de passe"
                      placeholder="Mot de passe"
                      required
                    />
                    <Form.Input
                      type="password"
                      name="passwordConfirm"
                      fluid
                      icon="lock"
                      iconPosition="left"
                      label="Confirmer le mot de passe"
                      placeholder="Confirmer le mot de passe"
                      required
                    />
                    <p style={{ color: "red" }}>{this.state.errorMsg}</p>
                    <Button type="submit" color={"green"} fluid size={"large"}>
                      Confirmer
                    </Button>
                  </Segment>
                </Form>
              </Grid.Column>
            </Grid>
          </div>
          /
        </NavBarLayout>
      );
    }
  }
}
