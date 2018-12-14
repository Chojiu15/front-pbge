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

import {createRequest} from "../api/Request.params";
import * as Register from "../api/Register";
const MEMBER_ROUTE = "/member/register";
const COMPANY_ROUTE = "/company/register";
const BAD_CREDENTIALS_MSG = "Login ou mot de passe incorrect.";

export default class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "member",
      errorMsg: "",
<<<<<<< HEAD
      Redirect: false
=======
      loading: false
>>>>>>> 51bf806447b248d9058d7f798d5497fff2ef6999
    };
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleRadioChange = (e, { value }) => this.setState({ value });

  onSubmit(newUser, usertype) {
<<<<<<< HEAD
    console.log(newUser);
    console.log(usertype);
    this.setState({ redirect: true });
=======
    let route = "";
    usertype === "member" ? (route = MEMBER_ROUTE) : (route = COMPANY_ROUTE);

    const request = createRequest();
    const register = Register.registerRequest(request);
    register(route, newUser).then(response => {

    }).catch(e => {
      if (typeof (e.response) !== "undefined") {
        alert(e.message);
        this.setState({loading: false})
      }
    });
>>>>>>> 51bf806447b248d9058d7f798d5497fff2ef6999
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="./connexion" />;
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

<<<<<<< HEAD
                <Form
                  size={"large"}
                  onSubmit={e => {
                    e.preventDefault();
                    const name = e.target.elements.lastName.value;
                    const surname = e.target.elements.firstName.value;
                    const username = e.target.elements.username.value;
                    const password = e.target.elements.password.value;
                    const passwordConfirm =
                      e.target.elements.passwordConfirm.value;
                    const usertype = this.state.value;
                    this.onSubmit(
                      { name, surname, username, password },
                      usertype
                    );
                  }}
                >
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
                      label="Nom"
                      placeholder="Nom"
                      required
=======
              <Form
                size={"large"}
                loading={this.state.loading}
                onSubmit={e => {
                  e.preventDefault();
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
                }}
              >
                <Segment>
                  <Form.Field>
                    <Radio
                      label="Membre"
                      name="radioGroup"
                      value="member"
                      checked={this.state.value === "member"}
                      onChange={this.handleRadioChange}
>>>>>>> 51bf806447b248d9058d7f798d5497fff2ef6999
                    />
                    <Form.Input
                      type="name"
                      name="firstName"
                      fluid
                      label="Prénom"
                      placeholder="Prénom"
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
