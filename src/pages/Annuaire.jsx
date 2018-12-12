import React from "react";
import { Dropdown } from "semantic-ui-react";
import Activite from "./secteurActivite";
// friendOptions = [
//   {
//     text: 'Jenny Hess',
//     value: 'Jenny Hess',
//     image: { avatar: true, src: '/images/avatar/small/jenny.jpg' },
//   },
//  ...
// ]

const DropdownExampleSelection = () => (
  <Dropdown placeholder="Select Friend" fluid selection options={Activite} />
);

export default DropdownExampleSelection;
