import React, { Component } from 'react';
import {Navbar, NavItem, Nav,Container} from 'react-bootstrap';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom';
import {submitLogout} from '../../action/signout'
import './lettalkheader.css'

class LetTalkHeader extends Component {
    constructor(props) {
        super(props);
    }
    handleLogout(){
        const {dispatch} = this.props;
        dispatch(submitLogout())
        localStorage.setItem('email',"")
        localStorage.setItem('token',"")
        localStorage.setItem('rating',"")
        localStorage.setItem('match_person',"")
        localStorage.setItem('roomId',"")
        localStorage.setItem('alias',"")
        localStorage.setItem('hobby',"")
        localStorage.setItem('username',"")
        localStorage.setItem('percent',"")
    }

    render() {
        return (
            <div>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand><Link to="/">LET TALK</Link></Navbar.Brand>
                      <Nav className="ml-auto">
                          <Container style={{backgroundColor: "transparent" }}>
                              {
                                  this.props.loggedIn ? (
                                      <div className="header">
                                         <span><NavItem > < Link to="/chat" >Chat</Link></NavItem></span>
                                         <span><NavItem > < Link to="/profile" >Profile</Link></NavItem></span>
                                         <span><NavItem > < Link to="/" onClick={this.handleLogout.bind(this)}>Logout</Link></NavItem></span>
                                      </div>
                                      )
                                  : (
                                      <div className="header">
                                          <span><NavItem><Link to="/login">Login</Link></NavItem></span>
                                          <span><NavItem><Link to="/register">Register</Link></NavItem></span>
                                          <span><NavItem><Link to="/CORS">CORS</Link></NavItem></span>
                                          <span><NavItem><Link to="/secret">Secret</Link></NavItem></span>
                                      </div>
                                      )
                              }
                          </Container>
                        </Nav>

                </Navbar>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn
    }
}
export default connect(mapStateToProps)(LetTalkHeader)
