import React, { useState } from "react";
import {Button} from "react-bootstrap";


class Cors extends  React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this)
    }

    onClick(){
      fetch("http://54.218.102.114:8080/v1/cars")
      .then(res => res.json())
      
    }
    render() {
        return (
            <div>
                <Button variant="success"  onClick={this.onClick}>Check CORS</Button>
            </div>
        )
    }
}
export default Cors;
