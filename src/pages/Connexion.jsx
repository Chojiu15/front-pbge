import React from "react";
import {
  Radio,
  Checkbox,
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from "semantic-ui-react";

const LoginForm = () => (
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
      style={{ paddingtop: "3em", paddingbottom: "3em" }}
    >
      Accueil
    </Button>
    <Grid textAlign="center" style={{ height: "100%" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="red" textAlign="center">
          Connectez-vous à votre compte
        </Header>
        <form>
          <div>
            <Radio label={{ children: "Entreprise" }} />
            <Radio style={{ margin: "0.4em" }} label={{ children: "Membre" }} />
          </div>
        </form>

        <Form size="large">
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Adresse e-mail"
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Mot de passe"
              type="password"
            />

            <Button color="green" fluid size="large">
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

export default LoginForm;
