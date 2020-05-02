import React from "react";
import './rating.css'
import {Col, Form, FormControl, FormGroup} from "react-bootstrap";
import {FiStar} from 'react-icons/fi';
import {rating} from "../../action/chat"
import {createBrowserHistory} from "history";
const history = createBrowserHistory();

class Rating extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.oneStar = this.oneStar.bind(this)
        this.twoStar = this.twoStar.bind(this)
        this.threeStar = this.threeStar.bind(this)
        this.fourStar = this.fourStar.bind(this)
        this.fiveStar = this.fiveStar.bind(this)
        this.state = {text:"",star:0}
    }

    oneStar(event){
        event.preventDefault()
        this.setState({star:1})
    }
    twoStar(event){
        event.preventDefault()
        this.setState({star:2})
    }
    threeStar(event){
        event.preventDefault()
        this.setState({star:3})
    }
    fourStar(event){
        event.preventDefault()
        this.setState({star:4})
    }
    fiveStar(event){
        event.preventDefault()
        this.setState({star:5})
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
            history.push('/')
            window.location.href = '/'
        })

    }
    componentWillUnmount() {
        history.push('/')
        window.location.href = '/'
    }

    render(){
        return (
            <div className="container">
                <div className="form-popup" id="myForm">
                    <Form  className="form-container">
                        <h1 style={{color:'black'}}>What do you think of this person? Please rate them:</h1>
                        <div>
                            <button onClick={this.oneStar}><FiStar/></button>
                            <button onClick={this.twoStar}><FiStar/></button>
                            <button onClick={this.threeStar}><FiStar/></button>
                            <button onClick={this.fourStar}><FiStar/></button>
                            <button onClick={this.fiveStar}><FiStar/></button>
                        </div>
                        <textarea style={{width:'100%',height:'100%'}} value={this.state.text} onChange={this.onChange}/>

                        <button type="submit" className="btn" onClick={this.onSubmit}>Submit Feedback</button>
                    </Form>
                </div>
            </div>
        )
    }
}
export default Rating