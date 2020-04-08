// Chat.js for the chat page
import React, {useState, useEffect, Component} from 'react';   //react builtin hooks - useState/useEffect
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

const Chat = ({location}) => {  //location is a built in react command you can use to get the url
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [getRoom, setGetRoom]    = useState(false)
    const [waiting, setWaiting]   = useState(true)
    const ENDPOINT = env.REACT_APP_API_URL
    var username = ""
    var room_id = ""
    //Check if a room is available
    React.useEffect(() => {
        console.log("waiting:", waiting)
        console.log("Get Room:", getRoom)
        async function getAvailRoom() {
            const response = await  fetch(`${env.REACT_APP_API_URL}/checkAvailable?roomId=${localStorage.getItem('roomId')}`, {
                method: 'GET',
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
                    setWaiting(false)
                    return res
                })
                .catch((e) => {
                    console.log(e)
                    }
                )
            return {}
        }
        if(waiting === true) {
            getAvailRoom()
        }
        else{
            console.log("Doesn't call again")
        }

    }, [getRoom,waiting])



    useEffect(() => {

            if(localStorage.getItem('roomId')){
                history.push({path:location.pathname,search: `room=${localStorage.getItem('roomId')}&name=${localStorage.getItem('username')}`})
                console.log("Get room when come in",getRoom)
            }
            else{

                setWaiting(true)
                const env = runtimeEnv();
                fetch(`${env.REACT_APP_API_URL}/room?username= + ${localStorage.getItem('username')}`, {
                    method: 'GET',
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
                        if (res.success ) {
                            if(getRoom === false) {
                               setGetRoom(true)
                                localStorage.setItem('roomId', res.msg)
                                history.push({
                                    path: location.pathname,
                                    search: `room=${localStorage.getItem('roomId')}&name=${localStorage.getItem('username')}`
                                })
                            }
                        }
                    })
                    .catch((e) => {
                            console.log(e)
                        }
                    )



            }

            socket = io(ENDPOINT);  //io(url) where url needs to be the endpoint of the server

            username = localStorage.getItem('username')
            room_id = localStorage.getItem('roomId')
            console.log(username,room_id)
            if(username && room_id){
                socket.emit('join', {name:username, room:room_id}, (error) => {
                    if (error) {
                        console.log(error);
                    }
                });
            }
            return () =>{
                username = localStorage.getItem('username')
                room_id = localStorage.getItem('roomId')
              setWaiting(true)
              setGetRoom(false)
                socket.disconnect()
            }
    },   [location.search]);    //only if ENDPOINT and location.search change, we need to change otherwise we don't need to change//this code added=> ",[ENDPOINT, location.search]" because we are specifying when to run useEffect, otherwise it's gonna have multiple connections set up "We have a new connection!!" message


    useEffect(() => {
        socket.on('message', (message) => { //listen for messages as 'message' is the key message in the backend
            setMessages(messages => [...messages, message]); //push every new message to our messages array
        });

        socket.on("roomData", ({users}) => {
            setUsers(users);
        });
    }, []); //update only when messages array is changed

    //function for sending messages
    const sendMessage = (event) => {
        event.preventDefault();

        //if message is true, then emit listener in backend with key message "sendMessage" and distribute the message to that room including the user that sent the message itself
        if(message){
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }


        return ( //passing room={room} in InfoBar component as we are sending the room name dynamically
            <div>
            {
                waiting ? (<div>Please wait, we are matching you...</div>) : (
                    <div className="outerContainer">
                        <div className="container">
                            <InfoBar room={room_id}/>
                            <Messages messages={messages} name={username}/>
                            <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
                        </div>
                        <TextContainer users={users}/>
                    </div>
                )
            }</div>
            )
}

export default Chat;