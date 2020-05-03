import React, { useState } from "react";
import {Col, Row, Carousel, Image, Form, FormGroup, FormControl} from 'react-bootstrap';
import {connect} from "react-redux";
import style from "./SlideProfile.css"
import runtimeEnv from "@mars/heroku-js-runtime-env";


class SlideProfile extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick= this.handleClick.bind(this)
        this.moveBack   = this.moveBack.bind(this)
        this.myInput = React.createRef()
        this.state = ({index:0,userProfile: [], rating: null})
    }
    componentDidMount() {
        //Send request to see online people
        //Call online and update users profile
        const env = runtimeEnv();
         fetch(`${env.REACT_APP_API_URL}/online`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            mode: 'cors'
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            }).then((res)=>
            {
                if(res.success){
                    this.setState({userProfile:res.userProfile})
                }
            })
            .catch((e) => {
                    console.log(e)
                    return e
                }
            )

         fetch(`${env.REACT_APP_API_URL}/rating?email=${localStorage.getItem('email')}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            mode: 'cors'
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            }).then((res)=>
            {
                if(res.success){
                    this.setState({rating: res.rating})
                }
            })
            .catch((e) => {
                    console.log(e)
                    return e
                }
            )

    }
    moveBack(){
        this.setState({index: this.state.index - 1})
    }
    handleClick(e){
        e.preventDefault()
        let outerElement = (window.innerWidth) /2

        console.log(outerElement)
        if(e.clientX < outerElement){
            if(this.state.index >= 1) {
                this.setState({index: this.state.index - 1})
            }
            else{
                alert("That the end of picture")
            }
        }
        else if(e.clientX > outerElement){
            if(this.state.index < this.state.userProfile.length -1) {
                this.setState({index: this.state.index + 1})
            }
            else{
                alert("That the end of picture")
            }
        }
    }
    render() {
        return (

            <Form className="slideProfile"   onClick={this.handleClick}>
                        {( this.state.userProfile.length >  this.state.index ) ?
                            <div
                                 ref={this.myInput}
                            >
                                    <img className='imgProfile' style={{width:'100%',height:'50%'}}src={this.state.userProfile[this.state.index].picture !== null ? this.state.userProfile[this.state.index].picture: "https://www.elegantthemes.com/blog/wp-content/uploads/2019/02/Sorry-This-File-Type-Is-Not-Permitted-for-Security-Reasons-Error-Featured-Image.jpg"}
                                         alt="Picture"/>
                                    <p>Name: {`${this.state.userProfile[this.state.index].alias}`}</p>
                                    <p>Description: {`${this.state.userProfile[this.state.index].description}`}</p>
                                    <p>Rating: {this.state.rating} </p>


                            </div>
                            :
                            <div><button onClick={this.moveBack}>Sorry, you scroll all people</button></div>


                        }
            </Form>


        )
    }
}

export default SlideProfile

