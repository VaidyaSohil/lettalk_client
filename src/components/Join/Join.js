//Join.js is for the join/login page
import React, {useState} from 'react'   //useState is a react hook for using state inside of the function based components
import {Link} from 'react-router-dom';  //link is used to link to our /chat page

import './Join.css';

const Join = () => {    //this is a functional component
    const [name, setName] = useState('');   //useState take 1 param (initial value) and return two values. They are current value and the function to set the value
    const [room, setRoom] = useState('');

    //could have used redux/props but used built in "useState" react hook to store the state and display parameter when joined a room
    return(
        <div className = "joinOuterContainer">
            <div className = "joinInnerContainer">
                <h1 className = "heading">LETTALK</h1>
                <div><input placeholder = "Name" className = "joinInput" type = "text" onChange={(event) => setName(event.target.value)}/></div>
                <div><input placeholder = "Room" className = "joinInput mt-20" type = "text" onChange={(event) => setRoom(event.target.value)}/></div>
                <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                    <button className = "button mt-20" type="submit">Sign In</button>
                </Link>
            </div>
        </div>
    )
}

export default Join;