import React, {Component} from "react";


export default class Results extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        if(this.props.type === "member") {
            return <p>Members</p>;
        }
        else {
            return <p>Companies</p>;
        }
    }
}