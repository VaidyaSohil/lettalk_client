// Chat.js for the chat page
import React, {useState, useEffect, Component} from 'react';   //react builtin hooks - useState/useEffect
import { useHistory } from "react-router-dom";
import queryString from 'query-string';
import io from 'socket.io-client';
import {createBrowserHistory} from 'history';
import './Chat.css';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';
import runtimeEnv from "@mars/heroku-js-runtime-env";
import {exitChat} from '../../action/chat'
import {  Button } from 'react-bootstrap';
import Modal from 'react-modal';

import { connect } from 'react-redux';
const history = createBrowserHistory();


let socket;
const env = runtimeEnv();
const ENDPOINT = env.REACT_APP_API_URL;
socket = io(ENDPOINT);  //io(url) where url needs to be the endpoint of the server



const Popup = () =>
    <div className='popup'>
        <div className='popup\_inner'>

            <button >close me</button>
        </div>
    </div>

const Advertise = () =>
    <div>
        <div>Want to get more transaction. Contact us for more information</div>
        <img/>
    </div>


async function checkRoomActive(){
    console.log("Sending room active")
    const response = await fetch(`${env.REACT_APP_API_URL}/roomAvailable?roomId=${localStorage.getItem('roomId')}`, {
        method: 'GET',
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
        })
        .catch((e) => {
                console.log(e)
                return e
            }
        )
    return response
}

async function getAvailRoom() {
    console.log("Sending check room available")
    const response = await fetch(`${env.REACT_APP_API_URL}/room?email=${localStorage.getItem('email')}&hobby=${localStorage.getItem('hobby')}`, {
        method: 'GET',
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
            }
        )
        .catch((e) => {
                console.log(e)

                return e
            }
        )
    return response
}

class Chat extends React.Component{
    constructor(props) {
        super(props);
        this.state={users:'',message:'',messages:[],waiting:true, accept:false, intervalId:0, intervalRoomActive:0,roomIsActive: false, count:0,name:'',room:'',timer:0,interval_timer:0
        }
        //let history = useHistory();
        this.handleMessage = this.handleMessage.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
    }

    componentWillMount(){

        const env = runtimeEnv();
        var data = {email:localStorage.getItem('email')}
        console.log(`${env.REACT_APP_API_URL}/userProfile?email=${data.email}`)
        console.log("email",data.email)
        fetch(`${env.REACT_APP_API_URL}/userProfile?email=${data.email}`, {
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
                localStorage.setItem('hobby',res.msg.hobby)
            })
            .catch( (e) => {
                console.log(e) }
            );

        
    }
    componentDidMount() {
        console.log("component did mount")
        if(socket) {
            socket.on('message', (message)=> { //listen for messages as 'message' is the key message in the backend
                this.setState({messages: [...this.state.messages, message]})
            });

            socket.on("roomData", ({users}) => {
                this.setState({users:users});
            });
        }
        else{
            console.log("Socket is undefined")
        }

        if(this.state.waiting === true) {
            let id = setInterval(
                async ()=> {
                    const response = await getAvailRoom()
                    if(response.success){
                        clearInterval(id)
                        this.setState({waiting:false})
                        localStorage.setItem('roomId', response.msg)
                        localStorage.setItem('percent', response.percent)

                        let answer = window.confirm(`This person match ${localStorage.getItem('percent')} , Do you want to continue?`)

                        if (answer === true){
                            //yes
                            this.setState({accept:true, roomIsActive:true})
                            history.push({
                                path: '/room',
                                search: `room=${localStorage.getItem('roomId')}&name=${localStorage.getItem('alias')}`
                            })


                            this.setState({name:localStorage.getItem('alias'), room:localStorage.getItem('roomId')})

                            if (typeof(this.state.name) !== "undefined" && typeof (this.state.room) !== "undefined") {
                                console.log("Join name and room",this.state.name,this.state.room)
                                socket.emit('join', { name: this.state.name ,room: this.state.room } , () => {
                                })
                            }
                            else{
                                alert("Something wrong, please refresh the page")
                            }
                            //Check room is active
                            let id_roomActive = setInterval(
                                async ()=> {
                                    const response = await checkRoomActive()
                                    if(!response.success){
                                        clearInterval(id_roomActive)
                                        exitChat().then(response => {
                                            if (response.success) {
                                                socket.emit('disconnect', () => {
                                                })
                                                alert("Sorry, they quit, we will redirect you to the main page")
                                                history.push('/')
                                                window.location.href = '/'
                                            }
                                        })
                                    }
                                }
                                , 1500);


                        }

                        else if(answer === false){
                           exitChat().then(res =>{
                               if(res.success){
                                   socket.emit('disconnect', () => {
                                   })
                                   history.push('/')
                                   window.location.href = '/'
                               }

                           })


                        }
                    }
                }
                , 1500);

        }

    }

    componentWillUnmount() {
       exitChat().then(res =>{
            if(res.success) {
                //Send to another page to rate
                history.push('/')
                window.location.href = '/'
            }
        })
    }


    handleMessage(message){
        this.setState({message: message})
    }
    //function for sending messages
    sendMessage (e){
        e.preventDefault();


        //if message is true, then emit listener in backend with key message "sendMessage" and distribute the message to that room including the user that sent the message itself
        if (this.state.message) {
            socket.emit('sendMessage', {name:this.state.name, message: this.state.message} ,  () => {
            })
            this.setState({message: ''})
        }
    }


    render(){
        return ( //passing room={room} in InfoBar component as we are sending the room name dynamically
            <div>
                {
                    localStorage.getItem('email')?    (
                    this.state.accept  ? (
                        <div className="outerContainer" >
                            <div className="container" style={{width:'100vw',height:'80vh'}}>
                                <InfoBar room={this.state.room}/>
                                <Messages messages={this.state.messages} name={this.state.name}/>
                                <Input message={this.state.message} onMessageChange = {this.handleMessage} sendMessage = {this.sendMessage}/>
                            </div>
                            <TextContainer users={this.state.users}/>
                        </div>
                    ): (
                        <div style={{height:"50vh"}}>
                            <p>Please wait, we are matching you...</p>

                            <div 
                                className="advertise"
                                style={{
                                    position: 'absolute', left: '50%', top: '50%',
                                    transform: 'translate(-50%, -50%)'
                                }}>
                              <Advertise/>
                            </div>
                        </div>
                    )
                    )
                        : <div><Popup/></div>

                }</div>
        )
    }
}




const mapStateToProps = state => {
    return {
    }
}

export default connect(mapStateToProps)(Chat);