/*                                                   *
 *             WILD CODE SCHOOL                      *
 *     v 1.0                                         *
 *                            author : Marc foix     *
 *                      marcfoix@hotmail.com         *
 *****************************************************
 *  Ce fichier permet de récupérer les informations  *
 *  en json sur la base de données de la table       *
 *          des entreprises (compagny)               *
 *                                                   *
 ****************************************************/

import React from "react";
import axios from "axios";

import Companies from "../../../../../../OneDrive/Documents/Web/New/front-pbge/src/components/Companies/Companies";
import { HREF } from "./Parameters";

export default class CompaniesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: []
    };
  }
  componentDidMount() {
    axios

      .get(HREF + `/api/companies.json`)
      .then(res => this.setState({ companies: res.data }));
  }

  render() {
    const { companies } = this.state;
    return <Companies companies={companies} />;
  }
}
