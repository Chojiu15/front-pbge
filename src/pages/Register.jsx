import React, {Component} from "react";
import {Form, Input, TextArea, Button, Select, Radio} from "semantic-ui-react";

export default class Register extends Component {

    render() {
        return(

            <Form>
                <Form.Group widths="equal">
                    <Form.Field>
                        <Radio
                            label='Membre'
                            name='radioGroup'
                            value='member'
                            checked={this.state.value === 'member'}
                            onChange={this.handleRadioChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Radio
                            label='Entreprise'
                            name='radioGroup'
                            value='company'
                            checked={this.state.value === 'company'}
                            onChange={this.handleRadioChange}
                        />
                    </Form.Field>
                    <Form.Field
                        id="form-input-control-first-name"
                        control={Input}
                        label="First name"
                        placeholder="First name"
                    />
                    <Form.Field
                        id="form-input-control-last-name"
                        control={Input}
                        label="Last name"
                        placeholder="Last name"
                    />
                    <Form.Field
                        id="form-input-control-last-name"
                        control={Input}
                        label="Last name"
                        placeholder="Last name"
                    />
                    <Form.Field
                        id="form-input-control-last-name"
                        control={Input}
                        label="Last name"
                        placeholder="Last name"
                    />
                </Form.Group>
                <Form.Field
                    id="form-button-control-public"
                    control={Button}
                    content="Confirm"
                    label="Label with htmlFor"
                />
            </Form>

        );
    }
}