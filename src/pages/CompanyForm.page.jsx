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
import {Button, Dropdown, Form, Segment} from "semantic-ui-react";

import {baseUrl, createRequest} from "../api/Request.params";
import List from "../components/List";
import LinkJobOffer from "../components/Companies/LinkJobOffer";
import * as Api from "../api/Api";
import {apiGetRequest} from "../api/Api";

export default class CompanyFormPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentCompany: this.props.userData,
      currentLocation: null,
      currentSector: null,
      currentJobOffers: [],
      redirectTo: null,
      isFetching: true,
      sectors: [],
      sectorId: 0
    };

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.getSectors = this.getSectors.bind(this)
    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {

    if (this.state.sectors.length === 0) {
      this.getSectors();
    }

    const request = createRequest();
    const getData = Api.apiGetRequest(request);

    if(this.props.userData.location !== null) {
      getData(this.props.userData.location).then(response => {
        this.setState({
          currentLocation: response.data
        })
      });
    }

    if(this.props.userData.sector !== null) {
      getData(this.props.userData.sector).then(response => {
        this.setState({
          currentSector: response.data,
          sectorId: response.data.id
        });
      })
    }

    if (this.props.userData.jobOffer && this.props.userData.jobOffer.length > 0) {
      this.props.userData.jobOffer.map(
          jobRoute => getData(jobRoute)
              .then(response => {
                let jobOffers = this.state.currentJobOffers;
                jobOffers.push(response.data);
                this.setState({
                  currentJobOffers: jobOffers
                })
              }));
    }

    this.setState({
      isFetching: false
        });
  }

  handleSelect = (e, {value}) => this.setState(value>0 ? {sectorId:value} : {sectorId:0});

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

  handleOnSubmit(e) {
    e.preventDefault();

    const email = e.currentTarget.elements.email.value;
    const name = e.currentTarget.elements.name.value;
    const companyEmail = e.currentTarget.elements.companyEmail.value;
    const phone = e.currentTarget.elements.phone.value;
    const address = e.currentTarget.elements.address.value;
    const pdgName = e.currentTarget.elements.pdgName.value;
    const description = e.currentTarget.elements.description.value;
    const zipcode = parseInt(e.currentTarget.elements.zipcode.value);
    const city = e.currentTarget.elements.city.value;

    let sector = null;
    if(this.state.sectorId > 0) {
      sector = "/api/sectors/" + this.state.sectorId;
    }

    const request = createRequest();
    const putData = Api.apiPutRequest(request);

    putData("api/companies/" + this.state.currentCompany.id, {
      email: email,
      name: name,
      companyEmail: companyEmail,
      phone: phone,
      address: address,
      pdgName: pdgName,
      description: description,
      sector: sector
    });

    this.setState({
      redirectTo: `/`
    });
  }

  render() {
    const {
      currentCompany,
      redirectTo,
      currentLocation,
      currentSector,
      currentJobOffers,
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
            <label htmlFor="dirName">Organisation : (*) </label>
            <input
              id="dirName"
              name="name"
              type="text"
              defaultValue={currentCompany.name}
              required
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="dirCompanyEmail">Email de l'organisation : </label>
            <input
              id="dirCompanyEmail"
              name="companyEmail"
              type="text"
              defaultValue={currentCompany.companyEmail ? currentCompany.companyEmail : ""}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="dirPdgName">Président général (*) : </label>
            <input
              id="dirPdgName"
              name="pdgName"
              type="text"
              defaultValue={currentCompany.pdgName ? currentCompany.pdgName : ""}
              required
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="dirEmail">Email (*) : </label>
            <input
              id="dirEmail"
              name="email"
              type="text"
              defaultValue={currentCompany.email}
              required
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
        <Form.Group widths="three">
          <Form.Field>
            <label htmlFor="jobOffer">Offre d'emploi : </label>
            {currentJobOffers.length ? (
              <List
                items={currentJobOffers}
                renderItem={(jobOffer, i) => (
                  <LinkJobOffer
                    key={i}
                    id={jobOffer.id}
                    title={jobOffer.title}
                  />
                )}
              />
            ) : (
              <Segment>Aucune offre</Segment>
            )}
          </Form.Field>
          <Form.Field>
            <Link to="/profil">
              <Button disabled>Ajouter une offre</Button>
            </Link>
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field>
            <label htmlFor="diraddress">Adresse : </label>
            <input
              id="diraddress"
              name="address"
              type="text"
              defaultValue={currentCompany.address ? currentCompany.address : ""}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="dirzipcode">CP : </label>
            <input
              id="dirzipcode"
              name="zipcode"
              type="text"
              disabled
              defaultValue={currentLocation ? currentLocation.zipcode : ""}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="dirlocation">Ville : </label>
            <input
              id="dirlocation"
              name="city"
              type="text"
              disabled
              defaultValue={currentLocation ? currentLocation.city : ""}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="dirPhone">Téléphone : </label>
            <input
              id="dirPhone"
              name="phone"
              type="text"
              defaultValue={currentCompany.phone ? currentCompany.phone : ""}
            />
          </Form.Field>
        </Form.Group>
        <Form.Field>
          <label htmlFor="dirdescription">Description : </label>
          <input
            id="dirdescription"
            name="description"
            type="text"
            defaultValue={currentCompany.description ? currentCompany.description : ""}
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
