import React from 'react';

import onlineIcon from '../../Icons/onlineIcon.png';

import './TextContainer.css';

const TextContainer = ({ users }) => (
    <div className="textContainer">
        <div>
            <h1>LETTALK<span role="img" aria-label="emoji">💬</span></h1>
        </div>
        {
            users
                ? (
                    <div>
                        <h1>People Online:</h1>
                        <div className="activeContainer">
                            <h2>
                                {users.map(({name}) => (
                                    <div key={name} className="activeItem"><img className="img-mr-10" alt="Online Icon" src={onlineIcon}/>
                                        {name}
                                    </div>
                                ))}
                            </h2>
                        </div>
                    </div>
                )
                : null
        }
    </div>
);

export default TextContainer;