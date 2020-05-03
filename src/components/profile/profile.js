import React, { useState } from "react";
import {Form, Button} from 'react-bootstrap';
import {connect} from "react-redux";
import runtimeEnv from '@mars/heroku-js-runtime-env';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {alias:"",age:"",hobby:"",interest:"",gender:"",picture:"",description: ""}
    }
    componentWillUnmount(){

    }
    componentDidMount() {
        const env = runtimeEnv();
        var data = {email:localStorage.getItem('email')}
        return fetch(`${env.REACT_APP_API_URL}/userProfile?email=` + data.email, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            mode: 'cors'})
            .then( (response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then( (res) => {
                let userProfile = res.msg
                this.setState({
                        alias:userProfile.alias,
                        age:userProfile.age,
                        hobby:userProfile.hobby,
                        gender: userProfile.gender,
                        picture: userProfile.picture,
                        description: userProfile.description
                }
                )

            })
            .catch( (e) => {
                console.log(e) }
            );

    }

    handleSubmit(e){
        e.preventDefault()
        var data = { alias: this.state.alias,age:this.state.age ,hobby: this.state.hobby, interest: this.state.interest,gender:this.state.gender,
        picture:this.state.picture,description:this.state.description
            ,email: localStorage.getItem('email')
        }
        console.log(data)
        const env = runtimeEnv();
        return fetch(`${env.REACT_APP_API_URL}/userProfile`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('token')
                    },
                    body: JSON.stringify(data),
                    mode: 'cors'})
                    .then( (response) => {
                        if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then( (res) => {
               alert("Your profile is successfully saved")
                console.log(res)
            })
            .catch( (e) => {
                console.log(e)
                console.log(e) }
                );
    }
    handleChange(e){
        const value = e.target.value;
        this.setState({
            ...this.state,
            [e.target.name]: value
        })
    }

    render() {
        return (
            <div>
            { this.props.loggedIn ?
                    <Form>
                        <Form.Group >
                            <Form.Label >Email</Form.Label>
                            <Form.Control name="email" value={ localStorage.getItem('email')} readonly="readonly"/>
                        </Form.Group>

                        <Form.Group >
                            <Form.Label >Alias</Form.Label>
                            <Form.Control name="alias" value={this.state.alias}  onChange={this.handleChange.bind(this)}/>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>age</Form.Label>
                            <Form.Control name="age" value={this.state.age} onChange={this.handleChange.bind(this)}/>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>hobby</Form.Label>
                            <Form.Control name="hobby" value={this.state.hobby} onChange={this.handleChange.bind(this)}/>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>gender</Form.Label>
                            <Form.Control name="gender" value={this.state.gender} onChange={this.handleChange.bind(this)}/>
                        </Form.Group>


                        <Form.Group >
                            <Form.Label>Description</Form.Label>
                            <Form.Control name="description" value={this.state.description} onChange={this.handleChange.bind(this)}/>
                        </Form.Group>

                        <Form.Group >
                            <Form.Label>Picture</Form.Label>
                            <Form.Control name="picture" value={this.state.picture} onChange={this.handleChange.bind(this)}/>
                        </Form.Group>

                        <Button variant="primary" type="submit" onClick={this.handleSubmit.bind(this)}>
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