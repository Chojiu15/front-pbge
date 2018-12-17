import React from "react";
import { Card, Image, Button } from "semantic-ui-react";

const CompanyResult = ({ userData }) => (
  <Card centered>
    <Card.Content>
      <Image
        floated="left"
        size="medium"
        src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
      />
      <Card.Header>{userData.name}</Card.Header>
      <Card.Description>
        <p>{userData.companyEmail}</p>
        <p>{userData.phone}</p>
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <div className="ui two buttons">
        <Button basic color="green">
          Plus d'information
        </Button>
      </div>
    </Card.Content>
  </Card>
);
export default CompanyResult;
