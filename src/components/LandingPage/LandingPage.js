import React, { useState } from "react";
import {Col, Row} from 'react-bootstrap';
import {connect} from "react-redux";
import style from "./css.css"
import runtimeEnv from "@mars/heroku-js-runtime-env";
import onlineIcon from '../../Icons/onlineIcon.png';

const Welcome = ({onlineUser}) =>

    <div className={style.container} style={{backgroundImage: "url('https://media2.giphy.com/media/3oFyD4yCrbo29sDhZe/giphy.gif?cid=ecf05e47b9df28c9ca1e8b5911141043dd4a065ed363a598&rid=giphy.gif')",height:'100vh',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}}>
        <div className={style.centered}>
            <h1>Hi there</h1><br/><h2>We are building a next generation of deep conversation</h2><br/>
            <h2>All your information and chat will be encrypted and will not be saved in our database</h2>
            <h2>No Personal Information Leak, No worry someone will spook you online </h2>
            <h2>Start checking out our member profile</h2>
            <h2>Post cat picture will be nice</h2>
            <h2><img className="onlineIcon" src={onlineIcon} alt="online icon" />{onlineUser} amazing people are currently online</h2>
        </div>
    </div>


class Landing_Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = { onlineUser: 0}
    }


    componentDidMount() {
        const env = runtimeEnv();

        fetch(`${env.REACT_APP_API_URL}/online`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then((res) => {
                    if(res.success && this.state.onlineUser !== res.numberOnline){
                        this.setState({onlineUser:res.numberOnline})
                    }
                }
            )
            .catch((e) => {
                    console.log(e)
                }
            )
    }


    render() {
        return (
            <div>
            <Row className="text-center">
                <Col>
                    {this.props.username !== " " ? <h1>Hi {this.props.username} </h1> : <Welcome onlineUser={this.state.onlineUser}/>}
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

