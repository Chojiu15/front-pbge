/*                                                   *
 *             WILD CODE SCHOOL                      *
 *     v 1.0                                         *
 *                            author : Marc foix     *
 *****************************************************
 *  Ce fichier permet de récupérer les informations  *
 *  en json sur la base de données de la table       *
 *          des membres (membres)                    *
 *                                                   *
 ****************************************************/
import React from "react";
import PropTypes from "prop-types";

import List from "./List";
import Member from "./Member";

/**
 * TODO
 * Display a list of members
 */

export default function Members({}) {
  return (
    <List items={files} renderItem={(file, i) => <File name={file.name} />} />
  );
}
