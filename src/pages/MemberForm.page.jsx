/*                                                  *
 *             WILD CODE SCHOOL                      *
 *     v 1.0                                         *
 *                            author : Marc foix     *
 *                      marcfoix@hotmail.com         *
 *****************************************************
 *  Ce fichier permet l'édition et la mise à jour de *
 * la base de données de la table entreprises        *
 *  (company), sector et location via l'API          *
 *                                                   *
 ****************************************************/

import React from "react";
import axios from "axios"; // HTTP library to make http request @see : https://github.com/axios/axios
import { Redirect, Link } from "react-router-dom";
import { Button, Dropdown, Form, Segment } from "semantic-ui-react";

import { baseUrl, createRequest } from "../api/Request.params";
import * as Api from "../api/Api";
import { apiGetRequest } from "../api/Api";

export default class MemberFormPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMember: this.props.userData,
      currentLocation: null,
      currentSector: null,
      redirectTo: null,
      isFetching: true,
      sectors: [],
      sectorId: 0
    };

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.getSectors = this.getSectors.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    if (this.state.sectors.length === 0) {
      this.getSectors();
    }

    const request = createRequest();
    const getData = Api.apiGetRequest(request);

    if (this.props.userData.location !== null) {
      getData(this.props.userData.location).then(response => {
        this.setState({
          currentLocation: response.data
        });
      });
    }

    if (this.props.userData.sector !== null) {
      getData(this.props.userData.sector).then(response => {
        this.setState({
          currentSector: response.data,
          sectorId: response.data.id
        });
      });
    }

    this.setState({
      isFetching: false
    });
  }

  handleSelect = (e, { value }) =>
    this.setState(value > 0 ? { sectorId: value } : { sectorId: 0 });

  getSectors() {
    const request = createRequest();
    const getSectors = apiGetRequest(request);
    getSectors("/api/sectors").then(response => {
      let sectors = response.data.map(sector => ({
        key: sector.id,
        value: sector.id,
        text: sector.name
      }));
      this.setState({ sectors });
    });
  }

  handleOnSubmit(e) {
    e.preventDefault();

    const email = e.currentTarget.elements.email.value;
    const name = e.currentTarget.elements.name.value;
    const surname = e.currentTarget.elements.surname.value;
    const phone = e.currentTarget.elements.phone.value;
    const address = e.currentTarget.elements.address.value;
    const birthplace = e.currentTarget.elements.birthplace.value;
    const description = e.currentTarget.elements.description.value;
    const zipcode = parseInt(e.currentTarget.elements.zipcode.value);
    const city = e.currentTarget.elements.city.value;

    let sector = null;
    if (this.state.sectorId > 0) {
      sector = "/api/sectors/" + this.state.sectorId;
    }

    const request = createRequest();
    const putData = Api.apiPutRequest(request);

    putData("api/members/" + this.state.currentMember.id, {
      email: email,
      name: name,
      surname: surname,
      phone: phone,
      address: address,
      birthplace: birthplace,
      description: description,
      sector: sector
    });

    // const { data: currentCompany } = await axios.put(
    //   baseUrl + `/api/companies/${idcomp}.json`,
    //   {
    //     email,
    //     name,
    //     companyEmail,
    //     phone,
    //     address,
    //     pdgName,
    //     description
    //   }
    // );
    this.setState({
      // currentCompany,
      // currentLocation,
      // currentSector,

      redirectTo: `/`
    });
  }

  render() {
    const {
      currentMember,
      redirectTo,
      currentLocation,
      currentSector,
      isFetching
    } = this.state;
    if (redirectTo !== null) {
      return <Redirect to={redirectTo} />;
    }
    if (isFetching) {
      return <div>Data is fetching ....</div>;
    }

    return (
      <Form className="profile" onSubmit={this.handleOnSubmit}>
        <Form.Group widths="equal">
          <Form.Field>
            <label htmlFor="name">Nom (*) :</label>
            <input
              id="name"
              name="lastName"
              type="text"
              defaultValue={currentMember.name}
              required
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="surname">Prénom (*) : </label>
            <input
              id="surname"
              name="firstName"
              type="text"
              defaultValue={currentMember.surname ? currentMember.surname : ""}
              required
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="email">Email (*) : </label>
            <input
              id="email"
              name="email"
              type="text"
              defaultValue={currentMember.email ? currentMember.email : ""}
              required
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="birthplace">Lieu de Naissance : </label>
            <input
              id="birthplace"
              name="birthplace"
              type="text"
              defaultValue={currentMember.birthplace}
            />
          </Form.Field>
        </Form.Group>
        <label htmlFor="dirsector">Secteur : </label>
        <Form.Field>
          <Dropdown
            name="sector"
            placeholder="Secteur d'activité"
            fluid
            selection
            clearable
            options={this.state.sectors}
            onChange={this.handleSelect}
            value={this.state.sectorId ? this.state.sectorId : null}
          />
        </Form.Field>
        <Form.Group widths="equal">
          <Form.Field>
            <label htmlFor="address">Adresse : </label>
            <input
              id="address"
              name="address"
              type="text"
              defaultValue={currentMember.address ? currentMember.address : ""}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="zipcode">CP : </label>
            <input
              id="zipcode"
              name="zipcode"
              type="text"
              disabled
              defaultValue={currentLocation ? currentLocation.zipcode : ""}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="location">Ville : </label>
            <input
              id="location"
              name="city"
              type="text"
              disabled
              defaultValue={currentLocation ? currentLocation.city : ""}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="phone">Téléphone : </label>
            <input
              id="phone"
              name="phone"
              type="text"
              defaultValue={currentMember.phone ? currentMember.phone : ""}
            />
          </Form.Field>
        </Form.Group>
        <Form.Field>
          <label htmlFor="description">Description : </label>
          <input
            id="description"
            name="description"
            type="text"
            defaultValue={
              currentMember.description ? currentMember.description : ""
            }
          />
        </Form.Field>
        <br />
        <Button color="red" type="submit">
          Enregistrer
        </Button>
      </Form>
    );
  }
}
