/*                                                  *
 *             WILD CODE SCHOOL                      *
 *     v 1.0                                         *
 *                            author : Marc foix     *
 *                      marcfoix@hotmail.com         *
 *****************************************************
 *  Ce fichier permet l'édition des informations     *
 *  récupérés sur la base de données de la table     *
 *  job Offer à partir du formulaire d'édition de    *
 *      l'entreprise                                 *
 *                                                   *
 ****************************************************/

import React from "react";
import { Link } from "react-router-dom";
import { Segment } from "semantic-ui-react";

export default function LinkJobOffer({ id, title }) {
  return (
    <Link to={`/job_offers/${id}/edit`}>
      <Segment>{title}</Segment>
    </Link>
  );
}
