import React, { useState } from "react";
import {Col, Row, Carousel, Image} from 'react-bootstrap';
import {connect} from "react-redux";
import style from "./css.css"

let image = [
    {src:"https://images.unsplash.com/photo-1557773910-e340bfebbe62?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
     name: "Anonymous",
     description: "My name is"
    },
    {
     src:"data:image/jpeg;base64,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",
      name: "another anonymous",
      description: "My name is"
    },
    {
        src:"https://images.unsplash.com/photo-1532386236358-a33d8a9434e3?ixlib=rb-1.2.1&w=1000&q=80",
        name: "Another one",
        description: "Hello World"
    }
            ]

class SlideProfile extends React.Component {
    componentDidMount() {

    }

    render() {
        return (
            <Carousel>
                {
                    image.map((item) => {
                        return (
                            <Carousel.Item>
                                <Image src={item.src} rounded className="imgProfile"/>
                                <Carousel.Caption>
                                    <h3 className="captionText">{item.name}</h3>
                                    <p className="captionText">{item.description}</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        )}
                    )
                }
            </Carousel>
        )
    }
}

export default SlideProfile

