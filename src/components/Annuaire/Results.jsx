import React, {Component} from "react";
import MemberResult from "./MemberResult";
import CompanyResult from "./CompanyResult";

export default class Results extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.type === "member") {
            return this.props.usersData.map((userData, i) => (
                <MemberResult key={i} userData={userData}/>
            ));
        } else {
            return this.props.usersData.map((userData, i) => (
                <CompanyResult key={i} userData={userData}/>
            ));
        }
    }
}