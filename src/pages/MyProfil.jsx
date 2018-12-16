import React, {Component} from "react";

import NavBarLayout from "../components/NavBar/NavBar";
import {Redirect} from "react-router-dom";

import {createTokenRequest} from "../api/Request.params";
import {createRequest} from "../api/Request.params";
import * as Auth from "../api/Auth";
import * as Api from "../api/Api.js"
import CompanyFormPage from "./CompanyForm.page";
import MemberFormPage from "./MemberForm.page";

export default class MyProfile extends Component {
    state = {};

    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: true,
            userId: null,
            userType: null,
            userData: null
        };
        this.loginCheck = this.loginCheck.bind(this);
        this.getUserData = this.getUserData.bind(this);
    }

    getUserData() {
        const request = createRequest();
        const getUserData = Api.apiGetRequest(request);

        if (this.state.userType === "member") {
            getUserData("api/members/" + this.state.userId).then(response => {
                this.setState({
                    isAuthenticated: true,
                    userData: response.data
                });
            }).catch(response => {
                this.setState({
                    isAuthenticated: false
                })
            });
        } else {
            getUserData("api/companies/" + this.state.userId).then(response => {
                this.setState({
                    isAuthenticated: true,
                    userData: response.data
                });
            }).catch(response => {
                this.setState({
                    isAuthenticated: false
                })
            });
        }
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

    componentDidMount() {
        this.loginCheck();
    }

    render() {
        if (!this.state.isAuthenticated) {
            return <Redirect to={"./connexion"}/>
        } else {
            if (this.state.userType === "company" && this.state.userData !== null) {
                return (
                    <div>
                        <NavBarLayout userData={this.state}
                                      children={<CompanyFormPage userData={this.state.userData}/>}/>
                    </div>
                )
            } else if (this.state.userType === "member" && this.state.userData !== null) {
                return (
                    <div>
                        <NavBarLayout userData={this.state}
                                      children={<MemberFormPage userData={this.state.userData}/>}/>
                    </div>
                )
            } else {
                            return <div></div>
            }
        }
    }
}
