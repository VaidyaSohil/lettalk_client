import React, { useState } from "react";


class Cors extends  React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this)
    }

    onClick(){
      fetch("https://google.com")
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
