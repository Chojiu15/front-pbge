import React from "react";
import {
    Button,
    Container,
    Card,
    Grid,
    Header,
    List,
    Segment,
    Icon,
    Image
} from "semantic-ui-react";
import logo from "../NavBar/logo.jpg";

const HomeContent = () => (
    <Container>
        <Segment style={{padding: "7.3em 0em"}}
                 vertical
                 position="center"
                 textAlign="center">
            <Header
                as="h2"
                style={{fontSize: "3em", color: "red"}}
            >
                Entreprendre au Pays-Basque
            </Header>
            <Header as="h3" style={{padding: "1em 0em"}}> L'annuaire en ligne qui met en lien les étudiants des Grandes
                Ecoles et les entreprises du Pays-Basque</Header>
            <Card.Group>
                <Card centered>
                    <Card.Content>
                        <Card.Header>Déjà un compte ?</Card.Header>
                        <Card.Description>
                            Vous souhaitez accéder à l'annuaire et vous possédez déjà un compte sur Entreprendre au
                            Pays-Basque
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui two buttons'>
                            <Button as="a" href="./connexion" basic color='green'>
                                Se connecter
                            </Button>
                        </div>
                    </Card.Content>
                </Card>
                <Card centered>
                    <Card.Content>
                        <Card.Header>Pas encore de compte ?</Card.Header>
                        <Card.Description>Vous souhaitez accéder à l'annuaire mais n'avez pas encore de
                            compte</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui two buttons'>
                            <Button as="a" href="./enregistrement" basic color='green'>
                                S'enregistrer
                            </Button>
                        </div>
                    </Card.Content>
                </Card>
            </Card.Group>


        </Segment>
        <Segment style={{padding: "7.3em 0em"}}
                 vertical
                 position="center"
                 textAlign="center">
            <Header
                as="h2"
                style={{fontSize: "3em", color: "red"}}
            >
                Du Pays-Basque aux Grandes-Ecoles
            </Header>
            <Header as="h3" style={{fontSize: "2em"}}>
                Agir pour l'égalité des chances et le développement du territoire
            </Header>
            <Image
                src={logo}
                height="300px"
                width="150px"
                floated={"left"}
            />
            <Header as="h4" style={{fontSize: "1.80em"}}>
                Nos missions :
            </Header>
            <Header style={{fontSize: "1.2em"}}>
                    Fédérer les étudiants et diplômés du territoire
            </Header>
            <Header style={{fontSize: "1.2em"}}>
                Renforcer l'égalité des chances au Pays-Basque
            </Header>
            <Header style={{fontSize: "1.2em"}}>
                    Resserrer les liens avec le territoire
            </Header>
            <Button
                size="huge"
                target="_blank"
                href="https://www.dupaysbasqueauxgrandesecoles.org/"
                color="green"
                style={{marginTop: "1em"}}
            >
                Nous connaître
            </Button>
        </Segment>
        <Segment style={{padding: "2em 0em"}} vertical>
            <Container text>
                <Header as="h3" style={{fontSize: "2em"}}>
                    Qui sommes nous ?
                </Header>
                <p style={{fontSize: "1.33em"}}>
                    Nous sommes plus de 180 étudiants et diplômés de tous les cursus
                    sélectifs, provenant des lycées publics, privés et de l'ikastola, à
                    nous être réunis afin d'apporter notre aide aux lycéens du territoire.
                    Par notre action en faveur de l'égalité des chances, nous comptons
                    amorcer le rattrapage du territoire dans l'accès à l'enseignement
                    supérieur, mais aussi renforcer notre économie en resserrant les liens
                    entre les diplômés et les entrepreneurs du Pays basque.
                </p>
                <Button
                    color="green"
                    target="blank"
                    href="https://www.helloasso.com/associations/des-territoires-aux-grandes-ecoles/adhesions/plateforme-d-adhesions-et-de-dons-2018-2019"
                >
                    Rejoignez nous !
                </Button>
            </Container>
        </Segment>
        <Segment inverted vertical style={{padding: "1em 0em"}}>
            <Container>
                <Grid divided inverted stackable>
                    <Grid.Row>
                        <Grid.Column width={3} style={{marginLeft: "2em"}}>
                            <Header inverted as="h4" content="Contact"/>
                            <List link inverted>
                                <List.Item>contact.dpbge@gmail.com</List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={10}>
                            <Header as="h4" inverted>
                                Réseaux-sociaux
                            </Header>
                            <List link inverted>
                                <Button
                                    color="facebook"
                                    target="blank"
                                    href="https://www.facebook.com/DPBGE/"
                                >
                                    <Icon name="facebook"/> Facebook
                                </Button>

                                <Button
                                    color="twitter"
                                    target="blank"
                                    href="https://twitter.com/dpbge"
                                >
                                    <Icon name="twitter"/> Twitter
                                </Button>
                                <Button
                                    color="linkedin"
                                    target="blank"
                                    href="https://www.linkedin.com/company-beta/11151375/"
                                >
                                    <Icon name="linkedin"/> LinkedIn
                                </Button>
                                <Button
                                    color="instagram"
                                    target="blank"
                                    href="https://www.instagram.com/dpbge/"
                                >
                                    <Icon name="instagram"/> Instagram
                                </Button>
                                <Button
                                    color="youtube"
                                    target="blank"
                                    href="https://www.youtube.com/channel/UCk0Hrx_PthwAYSrE7qCXrkg"
                                >
                                    <Icon name="youtube"/> YouTube
                                </Button>
                            </List>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </Segment>
    </Container>
);
export default HomeContent;
