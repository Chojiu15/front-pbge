/*                                                  *
 *             WILD CODE SCHOOL                      *
 *     v 1.0                                         *
 *                            author : Marc foix     *
 *                      marcfoix@hotmail.com         *
 *****************************************************
 *  Ce fichier permet de lister les informations     *
 *  récupérés sur la base de données de la table     *
 *  entreprise à partir du menu principal.           *
 *  Il permet le lien vers le formulaire d'édition   *
 ****************************************************/
import React from "react";

import { Grid, Segment } from "semantic-ui-react";

import List from "./List";
import Company from "./Company";

export default function Companies({ companies }) {
  return (
    <div>
      <Grid
        centered
        textAlign="left"
        style={{ height: "100%" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 650 }}>
          <Segment stacked>
            <List
              items={companies}
              renderItem={(company, i) => (
                <ul>
                  <h2>
                    <li>
                      Organisation :{" "}
                      <Company id={company.id} name={company.name} />
                    </li>
                    <li>
                      Nom du P.D.G. :{" "}
                      <Company id={company.id} pdgName={company.pdgName} />
                    </li>
                    <li>
                      Email : <Company id={company.id} email={company.email} />
                    </li>
                    <li>
                      Téléphone :{" "}
                      <Company id={company.id} phone={company.phone} />
                    </li>
                  </h2>
                </ul>
              )}
            />
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  );
}
