import React, { useState } from "react";
import {Form, Button} from 'react-bootstrap';
import {connect} from "react-redux";

class Profile extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
            { this.props.loggedIn ?
                    <Form>
                        <Form.Group >
                            <Form.Label>Alias</Form.Label>
                            <Form.Control   />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>age</Form.Label>
                            <Form.Control />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>hobby</Form.Label>
                            <Form.Control />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>interest</Form.Label>
                            <Form.Control />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>gender</Form.Label>
                            <Form.Control />
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Picture</Form.Label>
                            <Form.Control />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                : <h1>You need to log in in order to perform this method</h1>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn
    }
}
export default connect(mapStateToProps)(Profile)