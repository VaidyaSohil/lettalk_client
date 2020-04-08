
import React from 'react';
import { useState, useEffect } from 'react';
import onlineIcon from '../../Icons/onlineIcon.png';
import closeIcon from '../../Icons/closeIcon.png';
import {createBrowserHistory} from 'history';
import './InfoBar.css';


const history = createBrowserHistory();

const InfoBar = ({ room }) => { //to display the room name dynamically, in chat.js we passed in the the InfoBar tag with room property with the room name
    const [exit, setExit] = useState(false);

        useEffect( ()=>
        {
            if(exit === true) {
              localStorage.setItem('roomId',"")
              history.push({path:'/'})
            }
        })

    return (
        <div className="infoBar">
            <div className="leftInnerContainer">
                <img className="onlineIcon" src={onlineIcon} alt="online icon"/>
                <h3>{room}</h3>
            </div>
            <div className="rightInnerContainer">
                <a href="/" onClick={() => {setExit(true)}}><img src={closeIcon} alt="close icon"/></a>
            </div>
        </div>
    )
}


export default InfoBar;