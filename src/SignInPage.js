import React, {Component, Fragment} from 'react';
import {Row, Button, Input} from 'react-materialize';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default class SignInPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""

        };
    }
    justSignedIn = false;

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        console.log("State change, id=%s",event.target.id);
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        cookies.set('email', this.state.email.valueOf() , { path: '/' });
        this.props.signInHandler();

    }

    render() {
        return (
            <div className="SignIn">
                <form onSubmit={this.handleSubmit}>
                    <Row>
                        <Input
                            id="email"
                            type="email"
                            label="email"
                            s={12}
                            autoFocus
                            //value={this.state.email}
                            onChange={this.handleChange} />
                        <Input
                            id="password"
                            type="password"
                            label="password"
                            s={12}
                            //value={this.state.email}
                            onChange={this.handleChange} />
                        <Button
                            waves='light'
                            type="submit"
                            disabled={!this.validateForm()}
                        >
                            sign in
                        </Button>
                        This sites uses cookies.
                    </Row>
                </form>
            </div>
        );
    }
}