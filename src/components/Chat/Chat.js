// Chat.js for the chat page
import React from 'react';   //react builtin hooks - useState/useEffect
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
import {getRating} from '../../action/chat'



import { connect } from 'react-redux';
import {checkIn} from "../../action/online";

const history = createBrowserHistory();


let socket;
const env = runtimeEnv();
const ENDPOINT = env.REACT_APP_API_URL;
socket = io(ENDPOINT);  //io(url) where url needs to be the endpoint of the server



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
        this.state={users:'',message:'',messages:[],waiting:true, accept:false, intervalId:0, intervalRoomActive:0,roomIsActive: false, count:0,name:'',room:'',timer:0,interval_timer:0,
            quit_before_room : true, intervalGetAvailRoom:0
        }
        //let history = useHistory();
        this.handleMessage = this.handleMessage.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
        localStorage.setItem('feedback',"false")
        checkIn()
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
                    this.setState({intervalGetAvailRoom: id})
                    if(response.success){
                        clearInterval(id)

                        this.setState({waiting:false})
                        localStorage.setItem('roomId', response.msg)
                        localStorage.setItem('percent', response.percent)
                        localStorage.setItem('match_person', response.match_person)

                        let answer = window.confirm(`This person match ${localStorage.getItem('percent')} , Do you want to continue?`)

                        if (answer === true){
                            //yes
                            localStorage.setItem('feedback', "true")

                            getRating().then( res =>{
                                if(res.success){
                                    localStorage.setItem('rating',res.rating)
                                }
                            })
                            this.setState({accept:true, roomIsActive:true, quit_before_room: false})

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
                                    if(!response.success) {
                                        console.log("Check room is active")
                                        history.push('/exitRoom')
                                        window.location.href = '/exitRoom'

                                    }

                                }
                                , 30000);


                        }

                        else if(answer === false){
                            history.push('/exitRoom')
                            window.location.href = '/exitRoom'



                        }
                    }
                }
                , 1500);

        }

    }


    componentWillUnmount() {
       socket.emit('disconnect', () => {
        })
        history.push('/exitRoom')
        window.location.href = '/exitRoom'
    }


    handleMessage(message){
        var Filter = require('bad-words'),
            filter = new Filter();

        this.setState({message: filter.clean(message)})
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
                            <div className="container" >
                                <InfoBar room={this.state.room}/>
                                <Messages messages={this.state.messages} name={this.state.name}/>
                                <Input message={this.state.message} onMessageChange = {this.handleMessage} sendMessage = {this.sendMessage}/>
                            </div>
                            <TextContainer users={this.state.users}/>
                        </div>
                    ): (
                        <div className="match">
                            <p>Please wait, we are matching you
                                <span > . </span>
                                <span>  . </span>
                                <span> . </span>
                            </p>

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
                        : <div>Dude, you need to login</div>

                }</div>
        )
    }
}




const mapStateToProps = state => {
    return {
    }
}

export default connect(mapStateToProps)(Chat);