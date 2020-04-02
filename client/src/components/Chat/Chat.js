// Chat.js for the chat page
import React, {useState, useEffect} from 'react';   //react builtin hooks - useState/useEffect
import queryString from 'query-string';
import io from 'socket.io-client';

import './Chat.css';

import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import TextContainer from '../TextContainer/TextContainer';

let socket;

const Chat = ({location}) => {  //location is a built in react command you can use to get the url
    const [name, setName] = useState('');   //useState take 1 param (initial value) and return two values. They are current value and the function to set the value
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'localhost:5000';  //current ENDPOINT for our server

    useEffect(() => {
        const {name, room} = queryString.parse(location.search);    //parsing the parameter "?name=sdasd&room=vvvv" and storing it in name and room respectively

        socket = io(ENDPOINT);  //io(url) where url needs to be the endpoint of the server

        setName(name);  //setting the updated name and room using react-hook "useState"
        setRoom(room);

        socket.emit('join', {name, room}, (error) =>{
            if(error){
                alert(error);
            }
        });
    }, [ENDPOINT, location.search]);    //only if ENDPOINT and location.search change, we need to change otherwise we don't need to change//this code added=> ",[ENDPOINT, location.search]" because we are specifying when to run useEffect, otherwise it's gonna have multiple connections set up "We have a new connection!!" message

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


    return( //passing room={room} in InfoBar component as we are sending the room name dynamically
        <div className = "outerContainer">
            <div className = "container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <TextContainer users={users}/>
        </div>
    )
}

export default Chat;