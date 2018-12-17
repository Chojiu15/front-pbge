import React from "react";
import {Card, Image, Button} from "semantic-ui-react";

const MemberResult = ({userData}) => (
    <Card centered>
        <Card.Content>

            <Card.Header>{userData.name} {userData.surname}</Card.Header>
            <Card.Description>
                <Image floated='left' size='tiny' src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'/>
                <p>{userData.email}</p>
                <p>{userData.phone}</p>
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <div className='ui two buttons'>
                <Button basic disabled color='green'>
                    Plus d'information
                </Button>
            </div>
        </Card.Content>
    </Card>
);
export default MemberResult;