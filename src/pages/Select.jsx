import React, { Component } from "react";
import { Form, Radio, Dropdown, Button } from "semantic-ui-react";
import Activite from "./secteurActivite.jsx";

export default class RadioExampleRadioGroup extends Component {
  state = {};
  handleChange = (e, { value }) => this.setState({ value });

  render() {
    return (
      <Form style={{ marginTop: "14em", marginLeft: "40em" }}>
        <Form.Field>
          <Radio
            label="Entreprise"
            name="radioGroup"
            value="this"
            checked={this.state.value === "this"}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label="Membre"
            name="radioGroup"
            value="that"
            checked={this.state.value === "that"}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Dropdown
          style={{ marginLeft: "-20em" }}
          placeholder="Secteur d'activité"
          fluid
          selection
          options={Activite}
        />
        <Button color="green">Rechercher</Button>
      </Form>
    );
  }
}
