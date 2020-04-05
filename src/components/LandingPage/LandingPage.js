import React, { useState } from "react";
import {Col, Row} from 'react-bootstrap';
import {connect} from "react-redux";

const Welcome = ({}) => <div><h1>Hi there</h1><br/><h2>We are building a next generation of deep conversation</h2></div>



class Landing_Page extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Row className="text-center">
                <Col>
                    {this.props.username !== " " ? <h1>Hi {this.props.username} </h1> : <Welcome/>}
                </Col>
            </Row>
        )
    }
}
const mapStateToProps = state => {
    return {
        username: state.auth.username
    }
}
export default connect(mapStateToProps)(Landing_Page)

