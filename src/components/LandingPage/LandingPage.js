import React, { useState } from "react";
import {Col, Row} from 'react-bootstrap';
import {connect} from "react-redux";
import style from "./css.css"

const Welcome = ({}) =>

    <div className={style.container} style={{backgroundImage: "url('https://media2.giphy.com/media/3oFyD4yCrbo29sDhZe/giphy.gif?cid=ecf05e47b9df28c9ca1e8b5911141043dd4a065ed363a598&rid=giphy.gif')",height:'100vh',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}}>
        <div className={style.centered}>
            <h1>Hi there</h1><br/><h2>We are building a next generation of deep conversation</h2>
        </div>
    </div>


class Landing_Page extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
            <Row className="text-center">
                <Col>
                    {this.props.username !== " " ? <h1>Hi {this.props.username} </h1> : <Welcome/>}
                </Col>
            </Row>

            </div>

        )
    }
}
const mapStateToProps = state => {
    return {
        username: state.auth.username
    }
}
export default connect(mapStateToProps)(Landing_Page)

