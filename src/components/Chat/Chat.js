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
const history = createBrowserHistory();


let socket;
const env = runtimeEnv();
const ENDPOINT = env.REACT_APP_API_URL;
socket = io(ENDPOINT);  //io(url) where url needs to be the endpoint of the server



const Chat = ({location}) => {  //location is a built in react command you can use to get the url
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [waiting, setWaiting]   = useState(true)
    const [accept, setAccept] = useState(false)
    const [intervalId, setIntervalId] = useState(0)
    const [count,setCount] = useState(0)
    const [send,setSend] = useState(true)
    const [name,setName] = useState('')
    const [room,setRoom] = useState('')
    const [timer,setTimer] = useState(0)
    const [interval_timer, setTimerInterval] = useState(0)
    let history = useHistory();


    function getAvailRoom() {
        console.log("call again here")
        console.log((`${env.REACT_APP_API_URL}/room?email=${localStorage.getItem('email')}&hobby=fishing,jogging`))
        const response =  fetch(`${env.REACT_APP_API_URL}/room?email=${localStorage.getItem('email')}&hobby=fisihing,jogging`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        })
            .then((response) => {
                if (!response.ok) {
                    setCount(count => count+1)
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then((res) => {
                    if (res.success ) {
                        console.log("Success")
                        setWaiting(false)
                        if(localStorage.getItem('roomid') !== res.msg) {
                            localStorage.setItem('roomId', res.msg)
                        }
                    }
                    else{
                        setCount(count => count+1)
                    }
                }
            )
            .catch((e) => {
                    console.log(e)
                    setCount(count => count+1)
                }
            )


        return {}
    }



    //Make call to api when user go to /chat?
    useEffect(() => {

        let temp_Id = 0
        console.log("waiting:", waiting)
        if(waiting === true) {
            let id = setInterval(getAvailRoom, 4000);
            temp_Id = id
            setIntervalId(id)
        }
        return() =>{
            if(waiting === true){
                clearInterval(temp_Id)
            }
            else{
                clearInterval(interval_timer)
            }
        }
    },   [location.search]);    //only if ENDPOINT and location.search change, we need to change otherwise we don't need to change//this code added=> ",[ENDPOINT, location.search]" because we are specifying when to run useEffect, otherwise it's gonna have multiple connections set up "We have a new connection!!" message

    //Error handling
    useEffect(()=>{

        if(count >= 3){
            alert("No service availalbe, please refresh your page or waiting")
            clearInterval(intervalId);
            //Instruct them to do something else here
        }
        else{
            console.log(count)
        }
        return ()=>{
            setCount(0)
        }
    },[count])

    //
    useEffect(()=>
    {
        if(waiting === false){
            clearInterval(intervalId);
            //Here is the %match, do you want to continue?
            let answer = window.confirm("This person match 0% , Do you want to continue?")
            if (answer) {
                //some code
                setAccept(true);
            }
            else {
                //some code
                //Look for new room or exit
                setWaiting(true);
            }
            console.log("No more waiting")
        }
    },[waiting])


    //Set limit time for the chat room
    useEffect(() =>{
        if(timer >= 30){
            console.log("Time up")
            clearInterval(interval_timer)
        }
    },[timer])

    useEffect(() => {
        if(accept) {
            console.log("Count timer")
            let id_timer = setInterval( () =>  setTimer(count=>count+1), 1000)
            setTimerInterval(id_timer)

            if (localStorage.getItem('roomId') !== "") {

                history.push({
                    path: '/room',
                    search: `room=${localStorage.getItem('roomId')}&name=${localStorage.getItem('email')}`
                })

                setName(localStorage.getItem('email'))
                setRoom(localStorage.getItem('roomId'))

                if (typeof(name) !== "undefined" && typeof (room) !== "undefined") {
                    console.log("Do this twice")
                    socket.emit('join', { name:localStorage.getItem('email'),room:localStorage.getItem('roomId') })
                }
            else{
                alert("Something wrong, please refresh the page")
                }
            }
        }
    },[accept])


    useEffect(() => {
        if(socket) {
            socket.on('message', function(message) { //listen for messages as 'message' is the key message in the backend
                console.log("text message",message.text)
                setMessages(messages => [...messages, message]); //push every new message to our messages array
            });

            socket.on("roomData", ({users}) => {
                setUsers(users);
            });
        }
        else{
            console.log("Socket is undefined")
        }
    }, []); //update only when messages array is changed

    //function for sending messages
    const sendMessage = (event) => {
        event.preventDefault();


        //if message is true, then emit listener in backend with key message "sendMessage" and distribute the message to that room including the user that sent the message itself
        if (message) {
            socket.emit('sendMessage', {name:name, message: message} ,  () => {
            })
            setMessage('');
        }
    }


        return ( //passing room={room} in InfoBar component as we are sending the room name dynamically
            <div>
            {
                accept ? (
                    <div className="outerContainer">
                        <div className="container">
                            <InfoBar room={room}/>
                            <Messages messages={messages} name={name}/>
                            <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
                        </div>
                        <TextContainer users={users}/>
                    </div>
                ): (<div>Please wait, we are matching you...</div>)
            }</div>
            )
}

export default Chat;