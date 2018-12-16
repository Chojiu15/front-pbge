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

import { HREF } from "./Parameters";
import List from "../components/List";
import LinkJobOffer from "../components/Companies/LinkJobOffer";

export default class MemberFormPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMember: null,
      currentLocation: null,
      currentSector: null,
      currentJobOffers: [],
      redirectTo: null,
      isFetching: true
    };

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  async componentDidMount() {
    const { idcomp } = this.props;
    // const id = this.props.id;
    // const newPrrops = this.props.newProps;

    const { data: currentMember } = await axios.get(
      HREF + `/api/companies/${idcomp}.json`
    );
    const { data: currentLocation } = await axios.get(
      HREF + `${currentMember.location}.json`
    );
    const { data: currentSector } = await axios.get(
      HREF + `${currentMember.sector}.json`
    );

    let currentJobOffers = [];
    if (currentMember.jobOffer && currentMember.jobOffer.length > 0) {
      currentJobOffers = await Promise.all(
        currentMember.jobOffer.map(jobOffRoute =>
          axios.get(HREF + `${jobOffRoute}.json`).then(res => res.data)
        )
      );
    }

    this.setState({
      currentMember,
      currentLocation,
      currentSector,
      currentJobOffers,
      isFetching: false
    });
    // const setCurrentMember = company =>
    //   new Promise(resolve => {
    //     this.setState({ currentMember: company }, resolve);
    //   });
    // axios
    //   .get(
    //     HREF+"/api/companies/${id}.json"
    //   )
    //   .then(res => setCurrentMember(res.data))
    //   .then(() => {
    //     const currentMemberLocation = this.state.currentMember.location;
    //     return axios.get(
    //       HREF+"/api/companies/${currentMemberLocation}.json"
    //     );
    //   })
    //   .then(res => this.setState({ currentLocation: res.data }));
  }

  async handleOnSubmit(e) {
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
    const namesector = e.currentTarget.elements.sector.value;

    const { idcomp } = this.props;

    const { data: currentMember } = await axios.put(
      HREF + `/api/companies/${idcomp}.json`,
      {
        email,
        name,
        companyEmail,
        phone,
        address,
        pdgName,
        description
      }
    );

    const { data: currentLocation } = await axios.put(
      HREF + `${currentMember.location}.json`,
      {
        zipcode,
        city
      }
    );

    const { data: currentSector } = await axios.put(
      HREF + `${currentMember.sector}.json`,
      {
        name: namesector
      }
    );

    this.setState({
      currentMember,
      currentLocation,
      currentSector,

      redirectTo: `/companies`
    });
  }

  handleOnClick(e) {
    e.preventDefault();

    const { idcomp } = this.props;
  }

  render() {
    const {
      currentMember,
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
      <Form onSubmit={this.handleOnSubmit}>
        <Form.Group widths="equal">
          <Form.Field>
            <label htmlFor="dirName">Organisation : (*) </label>
            <input
              id="dirName"
              name="name"
              type="text"
              defaultValue={currentMember.name}
              required
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="dirMemberEmail">Email de l'organisation : </label>
            <input
              id="dirMemberEmail"
              name="companyEmail"
              type="text"
              defaultValue={currentMember.companyEmail}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="dirPdgName">Président général (*) : </label>
            <input
              id="dirPdgName"
              name="pdgName"
              type="text"
              defaultValue={currentMember.pdgName}
              required
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="dirEmail">Email (*) : </label>
            <input
              id="dirEmail"
              name="email"
              type="text"
              defaultValue={currentMember.email}
              required
            />
          </Form.Field>
        </Form.Group>
        <label htmlFor="dirsector">Secteur : </label>
        <Form.Field id="dirsector" name="sector" control="select">
          <option value={currentSector.name}> {currentSector.name}</option>
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
            <Link to="/job_offers/new">
              <Button>Ajouter une offre</Button>
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
              defaultValue={currentMember.address}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="dirzipcode">CP : </label>
            <input
              id="dirzipcode"
              name="zipcode"
              type="text"
              defaultValue={currentLocation.zipcode}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="dirlocation">Ville : </label>
            <input
              id="dirlocation"
              name="city"
              type="text"
              defaultValue={currentLocation.city}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="dirPhone">Téléphone : </label>
            <input
              id="dirPhone"
              name="phone"
              type="text"
              defaultValue={currentMember.phone}
            />
          </Form.Field>
        </Form.Group>
        <Form.Field>
          <label htmlFor="dirdescription">Description : </label>
          <input
            id="dirdescription"
            name="description"
            type="text"
            defaultValue={currentMember.description}
          />
        </Form.Field>
        <br />
        <Button color="red" type submit>
          Enregistrer
        </Button>
      </Form>
    );
  }
}
