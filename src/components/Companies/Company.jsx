/*                                                   *
 *             WILD CODE SCHOOL                      *
 *     v 1.0                                         *
 *                            author : Marc foix     *
 *                         marcfoix@hotmail.com      *
 *****************************************************
 *  Ce fichier permet l'édition des informations     *
 *  récupérés sur la base de données de la table     *
 *  entreprise à partir du menu principal.           *
 *                                                   *
 ****************************************************/

import React from "react";
import { Link } from "react-router-dom";

export default function Company({
  id,
  name,
  pdgName,
  email,
  phone,
  location,
  sector
}) {
  return (
    <Link to={`/companies/${id}/edit`}>
      {name}
      {pdgName}
      {email}
      {phone}
      {location}
      {sector}
    </Link>
  );
}
