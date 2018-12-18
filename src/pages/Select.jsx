import React, { Component } from "react";
import { Form, Radio, Dropdown, Button } from "semantic-ui-react";
import Activite from "./secteurActivite.jsx";
import axios from "axios";
import { HREF } from "./parametres";

export default class RadioExampleRadioGroup extends Component {
  state = {};
  handleChange = (e, { value }) => this.setState({ value });
  handleSelect = (e, { sector }) => this.setState({ sector });

  constructor(props) {
    super(props);
    this.state = {
      companies: "",
      sector: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit({ type, sector }) {
    if (type === "members") {
      console.log(HREF + `/api/members.json`);
      debugger;

      axios
        .get(HREF + `/api/members.json`)
        .then(res => this.setState({ companies: res.data }));
    } else {
      axios
        .get(HREF + "/api/companies.json")
        .then(res => this.setState({ companies: res.data }));
    }

    // this.setState({
    //   sector
    // });
  }

  render() {
    return (
      <Form
        style={{ marginTop: "14em", marginLeft: "40em" }}
        onSubmit={e => {
          e.preventDefault();
          const type = this.state.value;
          const sector = this.state.sector;
          this.onSubmit({ type, sector });
        }}
      >
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
          <Radio
            label="Membre"
            name="radioGroup"
            value="member"
            checked={this.state.value === "member"}
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Dropdown
            style={{ marginLeft: "-20em" }}
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
    );
  }
}
