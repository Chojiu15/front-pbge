/*                                                   *
 *             WILD CODE SCHOOL                      *
 *     v 1.0                                         *
 *                            author : Marc foix     *
 * *                      marcfoix@hotmail.com       *
 *****************************************************
 *  Ce fichier permet l'édition et la mise à jour de *
 * la base de données de la table job Offer          *
 *                                                   *
 ****************************************************/

import React, {Component} from "react";
import axios from "axios"; // HTTP library to make http request @see : https://github.com/axios/axios
import {Redirect} from "react-router-dom";
import {Button, Form} from "semantic-ui-react";

import * as Auth from "../api/Auth";
import * as Api from "../api/Api.js"
import {createRequest, createTokenRequest} from "../api/Request.params";
import NavBarLayout from "../components/NavBar/NavBar";

//import { HREF } from "./Parameters";
const HREF = "https://pbge.herokuapp.com";

export default class JobOfferFormPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: true,
            currentCompany: null,
            currentJobOffers: [],
            redirectTo: null,
            isFetching: true
        };

        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.loginCheck = this.loginCheck.bind(this);
    }

    componentDidMount() {
        const {id: jobOfferId} = this.props;

        const request = createRequest();
        const getJobOffer = Api.apiGetRequest(request);
        getJobOffer("/api/job_offers/" + jobOfferId).then(response => {
                this.setState({
                    currentJobOffer: response.data,
                    isFetching: false
                })
            }
        );
    }

    loginCheck() {
        let token = Auth.getToken();
        if (token == null) {
            this.setState({
                isAuthenticated: false
            });
            return false;
        } else {
            const checkToken = createTokenRequest(token);
            const checkRequest = Auth.tokenChecker(checkToken);
            checkRequest().then(response => {
                this.setState({
                    isAuthenticated: true,
                    userId: response.data.id,
                    userType: response.data.type
                });
                this.getUserData();
                return true;
            }).catch(() => {
                this.setState({
                    isAuthenticated: false
                });
                return false;
            })
        }
    }

    handleOnSubmit(e) {
        e.preventDefault();
        const title = e.currentTarget.elements.title.value;
        const contractType = e.currentTarget.elements.contractType.value;
        const workingHours = e.currentTarget.elements.workingHours.value;
        const experience = e.currentTarget.elements.experience.value;
        const description = e.currentTarget.elements.description.value;

        const {id} = this.props;

        const request = createRequest();
        const putData = Api.apiPutRequest(request);
        putData("api/job_offers/" + this.state.currentJobOffer.id,
            {
                title: title,
                contractType: contractType,
                workingHours: workingHours,
                experience: experience,
                description: description
            }).then(response => {
            this.setState({
                    redirectTo: `/profil`
                });
        });
    }

    render() {
        const {currentJobOffer, redirectTo, isFetching} = this.state;
        if (redirectTo !== null) {
            return <Redirect to={redirectTo}/>;
        }
        if (isFetching) {
            return <div>En cours de chargement Offre d'emploi...</div>;
        }

        if (!this.state.isAuthenticated) {
            return <Redirect to={"../connexion"}/>
        } else {
            return (
                <NavBarLayout userData={this.state}>
                    <Form className="profile" onSubmit={this.handleOnSubmit}>
                        <Form.Field>
                            <label htmlFor="dirOfferTitle">Titre de l'offre : </label>
                            <input
                                id="dirTitle"
                                name="title"
                                type="text"
                                defaultValue={currentJobOffer.title}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="dirContrat">Type de contrat : </label>
                            <input
                                id="dircontractType"
                                name="contractType"
                                type="text"
                                defaultValue={currentJobOffer.contractType}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="dirWorkingHours">
                                Nombre d'heures par semaine :{" "}
                            </label>
                            <input
                                id="dirWorkingHours"
                                name="workingHours"
                                type="text"
                                defaultValue={currentJobOffer.workingHours}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="dirExperience">Experience : </label>
                            <input
                                id="dirExperience"
                                name="experience"
                                type="text"
                                defaultValue={currentJobOffer.experience}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label htmlFor="dirdescription">Description de l'offre : </label>
                            <input
                                id="dirdescription"
                                name="description"
                                type="text"
                                defaultValue={currentJobOffer.description}
                            />
                        </Form.Field>
                        <br/>
                        <Button color="red" type={"submit"}>
                            Enregistrer
                        </Button>
                    </Form>
                </NavBarLayout>
            );
        }
    }
}
