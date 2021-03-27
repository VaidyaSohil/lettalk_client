import React, { useState } from "react";
import {Button} from "react-bootstrap";


class Secret extends  React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this)
    }

    onClick(){
      fetch("https://pure-beach-98773.herokuapp.com/v1/cars/secret",{mode: 'cors'})
      .then(res => res.json())
      
    }
    render() {
        return (
            <div>
                <Button variant="success"  onClick={this.onClick}>Secret</Button>
            </div>
        )
    }
}
export default Secret;
