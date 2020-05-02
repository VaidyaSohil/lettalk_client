import React, { Component} from 'react';
import { connect } from 'react-redux';
import { Col, Form, FormGroup, FormControl, Button, ToggleButton, ToggleButtonGroup, ButtonGroup, Alert } from 'react-bootstrap';
import {submitRegister} from "../../action/signin";
import {checkValidEmail} from "../../action/register"
import './register.css'
import runtimeEnv from "@mars/heroku-js-runtime-env";

const env = runtimeEnv();

const predefinedHobby = ["storytelling","photography","writing","scrapbooking"]
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
        this.state = {
            error_email: false,
            error_invalid_name: false,
            error_password: false
        }
    }

    validName(name) {
        // Checks name length and tests against regular expression. Returns true if valid, false if otherwise.
        var regName = /([a-zA-Z]{3,} {0,1}){1,3}$/;
        console.log(regName.test(name))
        if (!regName.test(name)) {
            return false
        }
        return true
    }

    handleChange(event){
        this.props.onChange(event)
    }

    toStep2() {
        var valid = true
        checkValidEmail(this.props.details.email).then( 
            // on fulfilled:
            () => {
                this.setState({error_email: true})
            },

            // on rejected:
            () => {
                this.setState({error_email: false})
                valid = false
            }
        )
        
        if (!this.validName(this.props.details.name)){
            this.setState({error_invalid_name: true})
            valid = false
        } else {
            this.setState({error_invalid_name: false})
        }

        if( this.props.details.password1 === "" || this.props.details.password2 === ""){
            this.setState({error_password: true})
            valid = false
        } else {
            this.setState({error_password: false})
        }

        if (valid) {
            this.setState({error_email:false})
            this.setState({error_invalid_name:false})
            this.props.onContinue()
        }
    }
    render(){
        return(
            <div>
                {console.log(this.state)}
                {/* Display error messages */}
                {
                    this.state.error_invalid_name
                        ? <Col className="d-flex justify-content-center">
                            <Alert variant="danger">
                                Invalid name. Name must have more than two letters a-z.
                            </Alert>
                        </Col>
                        : ""
                }
                {   
                    this.state.error_email
                        ?<Col className="d-flex justify-content-center">
                            <Alert variant="danger">
                                Invalid email
                            </Alert>
                        </Col>
                        : ""
                }
                {
                    this.state.error_password
                        ?<Col className="d-flex justify-content-center">
                            <Alert variant="danger">
                                Passwords don't match
                            </Alert>
                        </Col>
                        : ""
                }
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

                <div style={{display:'flex'}} >
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
        this.handleAddHobby = this.handleAddHobby.bind(this)
        this.handleRemoveHobby = this.handleRemoveHobby.bind(this)
        this.updateDetails = this.updateDetails.bind(this)
        this.state={
            details: {
                newHobby: ""
            }
        }
    }

    onSubmit(){
        this.props.register()
    }
    comeBack(){
        this.props.comeBack()
    }

    handleAddHobby() {
        this.props.addHobby(this.state.details.newHobby)
        this.setState( { details: { newHobby: "" } } )
    }

    handleRemoveHobby(hobby){
        this.props.removeHobby(hobby)
    }

    updateDetails(event) {
        let updateDetails = Object.assign({}, this.state.details);

        updateDetails[event.target.id] = event.target.value;
        this.setState({
          details: updateDetails,
        });
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

                <FormGroup>
                    <Col  sm={5}>
                        What do you like to do?
                    </Col>
                    <Col sm={10}>
                        {this.props.details.hobby.map((item) => {
                            return (
                                <ButtonGroup className="extraPadding" key={item}>
                                    <Button variant="outline-primary" disabled>{item}</Button>
                                    <Button variant="danger" onClick={() => {
                                        this.handleRemoveHobby(item)
                                    }}>X</Button>
                                </ButtonGroup>
                            )
                        })}
                    </Col>
                </FormGroup>
                <FormGroup controlId="newHobby">
                    <Form.Control type="text" placeholder="Add an interest..." onChange={this.updateDetails} value={this.state.details.newHobby}/>
                    <Button onClick={this.handleAddHobby}>Add</Button>
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
        this.addHobby = this.addHobby.bind(this)
        this.removeHobby = this.removeHobby.bind(this)

        this.state = {
            step: 1,
            details:{
                name: '',
                email: '',
                password1: '',
                password2: '',
                alias: '',
                age: '',
                hobby: predefinedHobby,
                image: ""
            },
            error_name: false,
            error_password: false,
            error_age: false,
            error_email: false
        };
    }

    updateDetails(event){
        let updateDetails = Object.assign({}, this.state.details);
        updateDetails[event.target.id] = event.target.value;
        this.setState({
            details: updateDetails
        });
    }

    addHobby(hobby) {
        let updateDetails = Object.assign({}, this.state.details);
        hobby = hobby.toLowerCase()
        if(updateDetails["hobby"].includes(hobby) === false){
            updateDetails["hobby"].push(hobby)
            this.setState({details: updateDetails})
        }
    }

    removeHobby(hobby) {
        let updateDetails = Object.assign({}, this.state.details);
        const index = updateDetails.hobby.indexOf(hobby)
        updateDetails["hobby"].splice(index, 1)
        this.setState({details: updateDetails})
    }

    comeBack = () =>{
        this.setState({step: this.state.step - 1})
    }

    toStep2= () => {
        if(!re.test(this.state.details.email)){
            this.setState({error_email:true})
        }
        if( this.state.details.password1 === "" || this.state.details.password2 === ""){
            this.setState({error_password: true})
        }
        if(this.state.details.password1 === this.state.details.password2 ) {

            this.setState({error_password:false}); //If there is no email associate with the current one
        }
        if (!this.state.error_invalid_name && !this.state.error_password && !this.state.error_email){
            this.setState({step: 2})
        }
    }

    toStep3= () =>{

        if(this.state.details.age === ""){
            this.setState({error_age:true})
        }
        else if(parseInt(this.state.details.age) < 18){
            this.setState({error_age:true})
        }
        else {
            this.setState({step: 3,error_age:false})
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
                return <Step3 register={this.register} comeBack={this.comeBack}  details={this.state.details} addHobby={this.addHobby} removeHobby={this.removeHobby}/>
            default:
                return <div>Something wrong, we are sending you back</div>
        }
    }


    render(){
        return (
            <div>
                {
                    this.state.error_age
                        ?<Col className="d-flex justify-content-center">
                                <Alert variant="danger">
                                    Your age is invalid or Sorry kids, you still young, wait a bit longer
                                </Alert>
                            </Col>
                        : ""
                }

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