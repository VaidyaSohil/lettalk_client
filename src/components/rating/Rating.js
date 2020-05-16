import React from "react";
import './rating.css'

import {Col, Form, FormControl, FormGroup, Overlay, Button, ButtonGroup, Popover, OverlayTrigger} from "react-bootstrap";
import {AiFillStar, AiOutlineStar} from 'react-icons/ai';
import {rating} from "../../action/chat"
import {createBrowserHistory} from "history";

const history = createBrowserHistory();

class Rating extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.state = {
            text:"",
            star:3
        }
    }

    onChange(event){
        event.preventDefault()
        this.setState({text:event.target.value})
    }

    onSubmit(event){
        event.preventDefault()
        //Dispatch to
        let data = {author: localStorage.getItem('email'), match_person: localStorage.getItem('match_person'), rating:this.state.star, comment: this.state.text}
        rating(data).then( res=>{
            alert("Thank you for submit your feedback")
            localStorage.setItem('feedback', false)
            localStorage.setItem('roomId',"")
            history.push('/')
            window.location.href = '/'
        })

    }

    
    handleClick(value) {
        console.log(value)
        this.setState({ star: value })
    }

    render(){
        return (
                    <Form  className="form-container">
                        <h3 style={{color:'black'}}>What do you think of this person? Please rate them:</h3>
                        
                        <ButtonGroup className="d-flex sm">
                            {[1,2,3,4,5].map((value) => {
                                var starVariant="warning"
                                var starComponent = <AiFillStar />

                                if (value > this.state.star) {
                                    starVariant = "outline-light"
                                    starComponent = <AiOutlineStar />
                                }
                                console.log(starVariant)
                                return (
                                        <Button 
                                            onClick={() => {this.handleClick(value)}}
                                            key={value} 
                                            variant={starVariant} 
                                            size="sm"  
                                        >
                                            {starComponent}
                                        </Button>
                                    )
                            })}
                        </ButtonGroup>
                        <textarea style={{width:'100%',height:'100%'}} value={this.state.text} onChange={this.onChange}/>

                        <button type="submit" className="btn" onClick={this.onSubmit}>Submit Feedback</button>
                    </Form>
        )
    }
}
export default Rating