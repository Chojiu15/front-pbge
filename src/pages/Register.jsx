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

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "member",
      errorMsg: "",
      Redirect: false
    };
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleRadioChange = (e, { value }) => this.setState({ value });

  onSubmit(newUser, usertype) {
    console.log(newUser);
    console.log(usertype);
    this.setState({ redirect: true });
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
