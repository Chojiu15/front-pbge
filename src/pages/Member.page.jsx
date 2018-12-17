/*                                                   *
 *             WILD CODE SCHOOL                      *
 *     v 1.0                                         *
 *                            author : Marc foix     *
 *                      marcfoix@hotmail.com         *
 *****************************************************
 *  Ce fichier permet de récupérer les informations  *
 *  en json sur la base de données de la table       *
 *  entreprise                                       *
 *                                                   *
 ****************************************************/

import React from "react";
import PropTypes from "prop-types";

// import Directory from "./Directory";

/**
 * TODO
 * Display the page that display one directory
 */
export default function MemberPage({ id }) {
  return <h1> Member number {id} </h1>;
}

MemberPage.propTypes = {
  id: PropTypes.any.isRequired
};
