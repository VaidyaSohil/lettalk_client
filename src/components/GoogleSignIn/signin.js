import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel  } from "react-bootstrap";
import "./signin.css";
import { GoogleLogin } from 'react-google-login';
import {submitLogin} from "../../action/signin";
import {submitLogout} from "../../action/signout"
import { connect } from 'react-redux'
import Landing_Page from '../LandingPage/LandingPage'
import style from "../LandingPage/Page.css";

class Sign_in extends React.Component {
    constructor(props) {
        super(props);
}
    //If true then set props.loggedIn = true
    responseGoogle(response){
        const {dispatch} = this.props;
        //If success then send to landing page with username
        //if fails, send to landing page but error code
        localStorage.setItem('token',response.tokenId)
        localStorage.setItem('email', response.profileObj.email)
        let data = {email:localStorage.getItem('email'),token:localStorage.getItem('token')}
        dispatch(submitLogin(data))


    }

render() {
    return (
        <div>
            {
               this.props.loggedIn ?  <Landing_Page/>:

                <GoogleLogin
                clientId="163619598811-ml35o7678ggr86kv1btdc8n9qg64fc36.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={this.responseGoogle.bind(this)}
                onFailure={this.responseGoogle.bind(this)}
                cookiePolicy={'single_host_origin'}
                />
                
            }
        </div
        >




    )
}
}
const mapStateToProps = state => {
    return {
        loggedIn:state.auth.loggedIn
    }
}

export default connect(mapStateToProps)(Sign_in)