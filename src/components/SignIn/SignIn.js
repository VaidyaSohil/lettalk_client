import React, { Component } from 'react';
import { submitLogin }  from "../../action/signin";
import { connect } from 'react-redux';
import {Col, Form, FormGroup, FormControl, Button, Alert} from 'react-bootstrap';
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
            },
            error_password: false
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
        dispatch(submitLogin(this.state.details))

        this.setState({error_password: true})

    }

    render(){
        return (
            <div>
                {
                    this.state.error_password
                        ? <Col className="d-flex justify-content-center">
                            <Alert variant="danger">
                                Invalid email or password
                            </Alert>
                        </Col>
                        : ""
                }

                <Form style={{ margin: 'auto',left:'45%', position:'relative'}}>
                    <FormGroup controlId="email">
                        <Col sm={2}>
                            Email
                        </Col>
                        <Col sm={2}>
                            <FormControl onChange={this.updateDetails} value={this.state.details.username} type="email" placeholder="Email" />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="password">
                        <Col  sm={2}>
                            Password
                        </Col>
                        <Col sm={2}>
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
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
    }
}

export default connect(mapStateToProps)(Login);