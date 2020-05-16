import React, { useState } from "react";
import {Col, Row} from 'react-bootstrap';
import {connect} from "react-redux";
import style from "./Page.css"
import onlineIcon from '../../Icons/onlineIcon.png';
import SlideProfile from "../Slide/SlideProfile";
import {createBrowserHistory} from "history";
import {Button} from "react-bootstrap";
import {checkIn, checkOnline} from "../../action/online";
import runtimeEnv from "@mars/heroku-js-runtime-env";

const history = createBrowserHistory();


class Welcome extends  React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this)
    }

    onClick(){
            //Dispatch to main page
            //Dispatch to login or register
        history.push('/login')
        window.location.href = '/login'
    }
    render() {
        return (
            <div>
                <h2><img className="onlineIcon" src={onlineIcon} alt="online icon" />{this.props.onlineUser} amazing people are currently online</h2>
                <Button variant="success"  onClick={this.onClick}>Let chat</Button>
            </div>
        )
    }
}

class Landing_Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = { onlineUser: 0}
    }


    componentDidMount() {

        let idcheckOnline = setInterval(
            async () => {
                console.log("Check online")
                const response = await  checkOnline()
                if(response.success && this.state.onlineUser !== response.numberOnline){
                    this.setState({onlineUser:response.numberOnline})
                }
            }
            , 60000)



    }


    render() {
        return (
            <div>
            <Row className="text-center">
                <Col>
                    {(this.props.username) === " "  ?
                        <Welcome onlineUser={this.state.onlineUser}/> :
                        <div>
                            <h1>Hi {this.props.username} </h1>
                            <p>Check out people just by click on profile, left or right</p>
                            <SlideProfile/>
                        </div>
                    }
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

