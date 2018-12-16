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
import { Button, Form, Segment } from "semantic-ui-react";

import {baseUrl, createRequest} from "../api/Request.params";
import * as Api from "../api/Api";

export default class MemberFormPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentMember: this.props.userData,
      currentLocation: null,
      currentSector: null,
      redirectTo: null,
      isFetching: true
    };

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  componentDidMount() {

    const request = createRequest();
    const getData = Api.apiGetRequest(request);

    console.log(this.props.userData);

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
          currentSector: response.data
        });
      })
    }

    this.setState({
      isFetching: false
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
    const namesector = e.currentTarget.elements.sector.value;

    const request = createRequest();
    const putData = Api.apiPutRequest(request);

    putData("api/members/" + this.state.currentMember.id, {
      email: email,
      name: name,
      surname: surname,
      phone: phone,
      address: address,
      birthplace: birthplace,
      description: description
    }).then(response => {
      console.log(response.data);
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

    // const { data: currentLocation } = await axios.put(
    //   baseUrl + `${currentCompany.location}.json`,
    //   {
    //     zipcode,
    //     city
    //   }
    // );
    //
    // const { data: currentSector } = await axios.put(
    //   baseUrl + `${currentCompany.sector}.json`,
    //   {
    //     name: namesector
    //   }
    // );
    //
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
                  name="name"
                  type="text"
                  defaultValue={currentMember.name}
                  required
              />
            </Form.Field>
            <Form.Field>
              <label htmlFor="surname">Prénom (*) : </label>
              <input
                  id="surname"
                  name="surname"
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
          <Form.Field id="dirsector" name="sector" control="select">
            <option value={currentSector ? currentSector.name : null}> {currentSector ? currentSector.name : null}</option>
            <option value="Agroalimentaire">Agroalimentaire</option>}
            <option value="biosciences, pharmacie et santé,recherche">
              Biosciences, pharmacie et santé,recherche
            </option>
            <option value="chimie, sciences de l'innovation">
              Chimie, sciences de l'innovation
            </option>
            <option value="informatique, nouvelles technologies">
              Informatique, nouvelles technologies
            </option>
            <option value="Journalisme ">Journalisme </option>
            <option value="Architecture/ Urbanisme/ Immobilier">
              Architecture/ Urbanisme/ Immobilier
            </option>
            <option value="Sciences sociales et humaines">
              Sciences sociales et humaines
            </option>
            <option value="Droit">Droit</option>
            <option value="Finance, Comptabilité, Banque,">
              Finance, Comptabilité, Banque
            </option>
            <option value="Conseil et stratégie">Conseil et stratégie</option>
            <option value="Administration publique">
              Administration publique
            </option>
            <option value="Enseignement">Enseignement</option>
            <option value="Communication / Marketing">
              Communication / Marketing
            </option>
            <option value="Autres">Autres</option>
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
                  defaultValue={currentLocation ? currentLocation.zipcode : ""}
              />
            </Form.Field>
            <Form.Field>
              <label htmlFor="location">Ville : </label>
              <input
                  id="location"
                  name="city"
                  type="text"
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
                defaultValue={currentMember.description ? currentMember.description : ""}
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
