import React, {Component} from "react";
import MemberResult from "./MemberResult";


export default class Results extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props);

        if(this.props.type === "member") {
            return this.props.usersData.map(userData => <MemberResult userData={userData}/>);
        }
        else {
            return <p>Companies</p>;
        }
    }
}