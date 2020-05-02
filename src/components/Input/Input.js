
import React from 'react';

import './Input.css';


class Input extends React.Component {
    constructor(props) {
        super(props);
        this.messageHandler = this.messageHandler.bind(this)
    }

    messageHandler(e){
        this.props.onMessageChange(e.target.value)
    }

    render() {
        return (
        <form className="form">
            <input
                className="input"
                type="text"
                placeholder="Type a message..."
                value={this.props.message}
                onChange={this.messageHandler}
                onKeyPress={event => event.key === 'Enter' ? this.props.sendMessage(event) : null}
            />

        </form>
        )
    }}



export default Input;