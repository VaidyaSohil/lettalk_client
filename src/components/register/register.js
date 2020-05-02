import React, { Component} from 'react';
import { connect } from 'react-redux';
<<<<<<< HEAD
import { Col, Form, FormGroup, FormControl, Button, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import {submitRegister,checkValidEmail} from "../../action/signin";
=======
import { Col, Form, FormGroup, FormControl, Button, ToggleButton, ToggleButtonGroup} from 'react-bootstrap';
import {submitRegister} from "../../action/signin";
>>>>>>> cc4f14f9c52f4a66f6826d22bc1d863f3ea301d2
import './register.css'
import runtimeEnv from "@mars/heroku-js-runtime-env";

const env = runtimeEnv();

const predefinedHobby = ["game","toy","chat","storytelling","crazymovie","photography","knitting","writing","gardening","dance","painting","sewing","drawing","hiking","cooking","scrapbooking"]

/*
class SimpleReactFileUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            file:null
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
    }
    onFormSubmit(e){
        e.preventDefault() // Stop form submit
        this.fileUpload(this.state.file).then((response)=>{
            console.log(response.data);
        })
    }
    onChange(e) {
        this.setState({file:e.target.files[0]})
    }
    fileUpload(file){

        const url = 'http://example.com/file-upload';
        const formData = new FormData();
        formData.append('file',file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return  post(url, formData,config)


    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                <h1>File Upload</h1>
                <input type="file" onChange={this.onChange} />
                <button type="submit">Upload</button>
            </form>
        )
    }
}
*/


class Step1 extends Component {
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.toStep2 = this.toStep2.bind(this)
    }

    handleChange(event){
        this.props.onChange(event)
    }
    toStep2(){
        checkValidEmail(this.props.details.email).then( res =>{
            if(res.success){
                this.props.onContinue()
            }
            else
            {
                alert("email is invalid")
            }
        })
    }
    render(){
        return(
            <div>
                <Form className="register" horizontal>

                    <FormGroup controlId="name">
                        <Col  sm={2}>
                        Name
                        </Col>
                        <Col sm={10}>
                         <FormControl onChange={this.handleChange} value={this.props.details.name} type="text" placeholder="Type your name..." required/>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="email">
                        <Col  sm={2}>
                            Email
                        </Col>
                        <Col sm={10}>
                            <FormControl onChange={this.handleChange} value={this.props.details.email} type="email"  placeholder="Type your email..." required/>
                        </Col>
                    </FormGroup>


                    <FormGroup controlId="password1">
                        <Col  sm={2}>
                        Password
                        </Col>
                        <Col sm={10}>
                           <FormControl onChange={this.handleChange} value={this.props.details.password1} type="password" placeholder="Type your password..." required/>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="password2">
                        <Col  sm={5}>
                            Confirm password
                        </Col>
                        <Col sm={10}>
                           <FormControl onChange={this.handleChange} value={this.props.details.password2} type="password" placeholder="Retype your password.." required/>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                    <Col smOffset={2} sm={10}>
                       <Button style={{float:'right'}} onClick={this.toStep2}>Continue</Button>
                    </Col>
                    </FormGroup>
                </Form>
            </div>

    )
}

}

class Step2 extends Component {
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.toStep3      = this.toStep3.bind(this)
        this.comeBack = this.comeBack.bind(this)
    }

    handleChange(event){
        event.preventDefault()
        this.props.onChange(event)
    }

    comeBack(){
        this.props.comeBack()
    }

    toStep3(){
        this.props.onContinue()
    }
    render(){

        return (
            <Form className="register" horizontal>
                <FormGroup controlId="alias">
                    <Col  sm={10}>
                        Alias: Your name will be displayed at this alias
                    </Col>
                    <Col sm={10}>
                        <FormControl onChange={this.handleChange} value={this.props.details.alias} type="text" placeholder="alias..." />
                    </Col>
                </FormGroup>

                <FormGroup controlId="age">
                    <Col  sm={10}>
                        Age: How old are you?
                    </Col>
                    <Col sm={10}>
                        <FormControl onChange={this.handleChange} value={this.props.details.age} type="text" placeholder="age..." />
                    </Col>
                </FormGroup>

                <div style={{display:'flex'}}>
                    <div className="radio">
                        <label>
                            <input type="radio"  value="Male" name="gender"/>
                            Male
                        </label>
                    </div>
                    <div className="radio">
                        <label>
                            <input type="radio" value="Female" name="gender"/>
                            Female
                        </label>
                    </div>

                    <div className="radio">
                        <label>
                            <input type="radio" value="Non-binary" name="gender" />
                            Non-binary
                        </label>
                    </div>
                </div>



                <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button onClick={this.comeBack}>Back</Button>
                            <Button style={{float:'right'}} onClick={this.toStep3}>Continue</Button>
                        </Col>
                </FormGroup>
                </Form>

        )
    }
}

class Step3 extends Component {
    constructor(props){
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
        this.comeBack = this.comeBack.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
    }

    onSubmit(){
        this.props.register()
    }
    comeBack(){
        this.props.comeBack()
    }

    handleClick(event){
        this.props.onChange(event)
    }
    handleRemove(event){
        event.preventDefault()
        this.props.onRemove(event)
    }
    render(){

        return (
            <Form className="register" horizontal >
                <div>
                    <div>Hobby</div>
                </div>

                <FormGroup controlId="hobby">
                    <Col  sm={5}>
                        What do you like to do?
                    </Col>
<<<<<<< HEAD
                    <Col sm={10} style={{display:'flex'}}>
                        <ToggleButtonGroup type="checkbox" vertical="true" onChange={this.handleClick}>
                            {predefinedHobby.map((item)=>{
                                return <ToggleButton value={item}>{item}</ToggleButton>
                            })}
                        </ToggleButtonGroup>

=======
                    <Col sm={10}>
                    <ToggleButtonGroup type="checkbox" vertical="true" onChange={this.handleClick}>
                        {predefinedHobby.map((item)=>{
                            return <ToggleButton value={item}>{item}</ToggleButton>
                            })}
                    </ToggleButtonGroup>
>>>>>>> cc4f14f9c52f4a66f6826d22bc1d863f3ea301d2

                    </Col>
                </FormGroup>



                <Button onClick={this.comeBack}>Back</Button>
                <Button style={{float:'right'}} onClick={this.onSubmit}>Register</Button>


            </Form>
        )
    }
}

var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/igm;

class Register extends Component {

    constructor(props){
        super(props);

        this.updateDetails = this.updateDetails.bind(this);
        this.register = this.register.bind(this);
        this.comeBack = this.comeBack.bind(this)
        this.updateHobby = this.updateHobby.bind(this)
        this.onRemove    = this.onRemove.bind(this)

        this.state = {
            step: 1,
            details:{
                name: '',
                email: '',
                password1: '',
                password2: '',
                alias: '',
                age: '',
                hobby: [],
                image: ""
            }
        };
    }

    updateDetails(event){
        let updateDetails = Object.assign({}, this.state.details);
        updateDetails[event.target.id] = event.target.value;
        this.setState({
            details: updateDetails
        });
    }

    updateHobby(event){
<<<<<<< HEAD

        let updateDetails = Object.assign({}, this.state.details);
        if(updateDetails["hobby"].includes(event.target.value) === false){
            updateDetails["hobby"].push(event.target.value)
            this.setState({details: updateDetails})
        }

    }

    onRemove(event){
        let updateDetails = Object.assign({}, this.state.details);
        const index = updateDetails.hobby.indexOf(event.target.value);
        if(index !== -1){
            updateDetails.hobby.splice(index,1)
            this.setState({details: updateDetails})
        }

=======
        let updateDetails = Object.assign({}, this.state.details)
        updateDetails["hobby"] = event
        this.setState({details: updateDetails})
>>>>>>> cc4f14f9c52f4a66f6826d22bc1d863f3ea301d2
    }
    comeBack = () =>{
        this.setState({step: this.state.step - 1})
    }

    toStep2= () => {

        console.log(this.state.details.password1,this.state.details.password2)
        if(this.state.details.name === ""){
            alert("You need a name")
        }
        else if(!re.test(this.state.details.email)){
            alert("Sorry, your email is not valid, please input again")
        }
        else if( this.state.details.password1 === "" || this.state.details.password2 === ""){
            alert("Sorry, your password doesn't match, please input again")
        }
        else if(this.state.details.password1 === this.state.details.password2 ) {
            this.setState({step: 2}); //If there is no email associate with the current one
        }
        else{
            alert("Some thing wrong, please come back")
        }
        //dispatch(submitRegister(this.state.details));
    }

    toStep3= () =>{

        if(this.state.details.age === ""){
            alert("Please input your age")
        }
        else if(parseInt(this.state.details.age) < 18){
            alert("Sorry kids, you still young, wait a bit longer")
        }
        else {
            this.setState({step: 3})
        }

    }


    register(){

        const {dispatch} = this.props;
        let data = {
            email: this.state.details.email,
            password: this.state.details.password1,
            alias: this.state.details.alias,
            age:  this.state.details.age,
            hobby: this.state.details.hobby,
            gender: this.state.details.gender,
            picture: this.state.details.picture,
            name: this.state.details.name
        }
        dispatch(submitRegister(data))
    }

    renderSwitch(param) {
        switch(param) {
            case 1:
                return <Step1 details={this.state.details} onChange={this.updateDetails} onContinue={this.toStep2}/>
            case 2:
                return <Step2 details={this.state.details} onChange={this.updateDetails} onContinue={this.toStep3} comeBack={this.comeBack}/>
            case 3:
                return <Step3 register={this.register} comeBack={this.comeBack}  details={this.state.details} onChange={this.updateHobby} onRemove={this.onRemove}/>
            default:
                return <div>Something wrong, we are sending you back</div>
        }
    }


    render(){
        return (
            <div>
                {this.renderSwitch(this.state.step)}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
    }
}

export default connect(mapStateToProps)(Register);