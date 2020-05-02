import React, { Component } from 'react';
import { submitLogin }  from "../../action/signin";
import { connect } from 'react-redux';
import { Col, Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import GoogleSignIn from '../GoogleSignIn/signin'
class Login extends Component {

    constructor(props) {
        super(props);
        this.updateDetails = this.updateDetails.bind(this);
        this.login = this.login.bind(this);

        this.state = {
            details:{
                email: '',
                password: ''
            }
        };
    }

    updateDetails(event){
        let updateDetails = Object.assign({}, this.state.details);

        updateDetails[event.target.id] = event.target.value;
        this.setState({
            details: updateDetails
        });
    }

    login() {
        const {dispatch} = this.props;
        dispatch(submitLogin(this.state.details));
    }

    render(){
        return (
            <Form horizontal alignItems="center">
                <FormGroup controlId="email">
                    <Col sm={2}>
                        Email
                    </Col>
                    <Col sm={3}>
                        <FormControl onChange={this.updateDetails} value={this.state.details.username} type="email" placeholder="Email" />
                    </Col>
                </FormGroup>

                <FormGroup controlId="password">
                    <Col  sm={2}>
                        Password
                    </Col>
                    <Col sm={3}>
                        <FormControl onChange={this.updateDetails} value={this.state.details.password} type="password" placeholder="Password" />
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Button onClick={this.login}>Sign in</Button>
                    </Col>
                </FormGroup>
                {/* <GoogleSignIn/> */}
            </Form>
        )
    }
}

const mapStateToProps = state => {
    return {
    }
}

export default connect(mapStateToProps)(Login);